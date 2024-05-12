import {CameraControls, MeshPortalMaterial, RoundedBox, useGLTF, useTexture, Text} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import {easing} from "maath";

const Scene = () => {
    const [active, setActive] = useState(false);
    const meshPortalMaterialRef = useRef();
    const cameraControlsRef = useRef();

    useFrame((_, delta) => {
        easing.damp(
            meshPortalMaterialRef.current,
            "blend",
            active ? 1 : 0,
            0.2,
            delta
        );
    });

    useEffect(() => {
        if (active) {
            // setLookAt(positionX, positionY, positionZ, targetX, targetY, targetZ, enableTransition)
            cameraControlsRef.current.setLookAt(0, 0, 3, 0, 0, 0, true);
        } else {
            cameraControlsRef.current.setLookAt(0, 0, 5, 0, 0, 0, true);
        }
    }, [active]);

    const model = useGLTF("./static/models/1.glb");
    const texture = useTexture("./static/textures/1.png");

    const doubleClickHandler = () => {
        setActive(!active);
    };

    return (
        <>
            <CameraControls ref={cameraControlsRef} />

            <Text font="./static/fonts/bold.ttf" position={[0, 1.5, 0.1]} fontSize={0.6}>
                Eggs
                <meshBasicMaterial toneMapped={false} />
            </Text>

            <RoundedBox
                args={[3, 4, 0.1]}
                radius={0.1}
                onDoubleClick={doubleClickHandler}
            >
                <MeshPortalMaterial ref={meshPortalMaterialRef}>
                    <primitive object={model.scene} scale={0.6} position-y={0.6} />

                    <mesh>
                        { /* args = (radius, widthSegments, heightSegments) */ }
                        <sphereGeometry args={[5, 64, 64]} />
                        <meshBasicMaterial map={texture} side={THREE.BackSide} />
                    </mesh>
                </MeshPortalMaterial>
            </RoundedBox>
        </>
    );
};

export default Scene;