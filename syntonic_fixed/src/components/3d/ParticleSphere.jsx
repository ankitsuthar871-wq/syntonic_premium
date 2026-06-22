import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';

export default function ParticleSphere() {
  const pointsRef = useRef();
  const mouseSmooth = useRef(new THREE.Vector2(0, 0));

  // Determine dynamic particle count for mobile vs desktop orientation
  const count = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return isMobile ? 400 : 800; // Reduced count to make it clean, minimal, and mobile-friendly
  }, []);

  // Generate particle attributes once
  const { positions, scales, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales    = new Float32Array(count);
    const phases    = new Float32Array(count);

    const phi_golden = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere for even distribution
      const theta = (2 * Math.PI * i) / phi_golden;
      const phi   = Math.acos(1 - 2 * (i + 0.5) / count);

      // Varied radii for depth
      const layer = Math.random();
      const r = layer < 0.6
        ? 2.0 + Math.random() * 0.3        // inner shell
        : layer < 0.85
          ? 2.5 + Math.random() * 0.4      // mid shell
          : 3.0 + Math.random() * 0.5;     // outer halo

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      scales[i] = 0.25 + Math.random() * 0.75;
      phases[i] = Math.random();
    }

    return { positions, scales, phases };
  }, [count]);

  // Shader uniforms (memoized — mutated in useFrame)
  const uniforms = useMemo(() => ({
    uTime:        { value: 0 },
    uMouse:       { value: new THREE.Vector2(0, 0) },
    uColorBase:   { value: new THREE.Color('#C9A96E') },   // warm gold
    uColorHover:  { value: new THREE.Color('#E8D5B0') },   // light gold
    uColorAccent: { value: new THREE.Color('#D4B896') },   // mid accent
  }), []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Smooth mouse lerp (never setState in useFrame)
    mouseSmooth.current.lerp(
      new THREE.Vector2(state.pointer.x, state.pointer.y),
      0.06
    );

    const mat = pointsRef.current.material;
    mat.uniforms.uTime.value  += delta;
    mat.uniforms.uMouse.value.copy(mouseSmooth.current);

    // Gentle global rotation
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={count}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          count={count}
          array={phases}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
