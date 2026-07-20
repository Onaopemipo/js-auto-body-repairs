"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group, Vector3 } from "three";

export function CameraRig() {
  const group = useRef<Group>(null);

  const camera = useThree((state) => state.camera);

  const targetPosition = useMemo(() => new Vector3(), []);

  const lookAtTarget = useMemo(() => new Vector3(0, 0.35, 0), []);

  useFrame((state, delta) => {
    targetPosition.set(
      state.pointer.x * 0.22,
      1.25 + state.pointer.y * 0.1,
      6.4,
    );

    camera.position.lerp(targetPosition, Math.min(1, delta * 2.5));

    camera.lookAt(lookAtTarget);
  });

  return <group ref={group} />;
}
