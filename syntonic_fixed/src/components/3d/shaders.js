// ─── Simplex 3D Noise (Ashima Arts) ───────────────────────────────────────────

const noise3D = `
vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x2_ = x_ * ns.x + ns.yyyy;
  vec4 y2_ = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x2_) - abs(y2_);

  vec4 b0 = vec4(x2_.xy, y2_.xy);
  vec4 b1 = vec4(x2_.zw, y2_.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

// ─── Vertex Shader ────────────────────────────────────────────────────────────

export const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;

  attribute float aScale;
  attribute float aPhase;

  varying float vAlpha;
  varying float vColorMix;
  varying float vDepth;

  ${noise3D}

  void main() {
    vec3 pos = position;

    // Organic breathing — layered noise at different frequencies
    float n1 = snoise(pos * 0.35 + uTime * 0.10);
    float n2 = snoise(pos * 0.70 + uTime * 0.06 + 50.0);
    float n3 = snoise(pos * 1.50 + uTime * 0.15 + 100.0);

    // Radial displacement (expands / contracts the sphere organically)
    vec3 radial = normalize(pos + 0.0001);
    pos += radial * (n1 * 0.40 + n2 * 0.15);

    // Tangential wobble (adds swirling motion)
    vec3 tangent = normalize(cross(radial, vec3(0.0, 1.0, 0.0)) + 0.0001);
    pos += tangent * n3 * 0.12;

    // Individual particle oscillation
    pos += radial * sin(uTime * 1.2 + aPhase * 6.28) * 0.04;

    // ── Antigravity cursor repulsion ──
    vec3 mousePos = vec3(uMouse.x * 4.5, uMouse.y * 3.2, 0.0);
    vec3 diff     = pos - mousePos;
    float dist    = length(diff);
    float repulse = smoothstep(3.2, 0.0, dist);
    float repulseStrong = pow(repulse, 1.6);
    pos += normalize(diff + 0.0001) * repulseStrong * 2.2;

    // Slight spiral on repulsion
    float angle = repulse * 1.2;
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    pos.xz = mix(pos.xz, rot * pos.xz, repulse * 0.3);

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aScale * (220.0 / -mvPos.z);
    gl_Position  = projectionMatrix * mvPos;

    vAlpha    = aScale;
    vColorMix = repulse;
    vDepth    = clamp(-mvPos.z / 12.0, 0.0, 1.0);
  }
`;

// ─── Fragment Shader ──────────────────────────────────────────────────────────

export const fragmentShader = `
  uniform vec3 uColorBase;
  uniform vec3 uColorHover;
  uniform vec3 uColorAccent;

  varying float vAlpha;
  varying float vColorMix;
  varying float vDepth;

  void main() {
    // Soft circular particle with gaussian-like falloff
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;

    float alpha = 1.0 - smoothstep(0.0, 0.5, d);
    alpha = pow(alpha, 1.8);             // softer falloff
    alpha *= vAlpha * 0.65;
    alpha *= mix(0.85, 1.0, 1.0 - vDepth); // depth fade

    // Color blending: base → hover → accent near cursor
    vec3 color = mix(uColorBase, uColorHover, vColorMix);
    color = mix(color, uColorAccent, vColorMix * vColorMix * 0.6);

    // Brighten particles near cursor
    color += vColorMix * 0.08;

    gl_FragColor = vec4(color, alpha);
  }
`;
