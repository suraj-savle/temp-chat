'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as OGL from 'ogl';

const LiquidChromeLogo = () => {
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    const container = containerRef.current;
    
    // 1. Setup Renderer with Alpha (Translucency)
    const renderer = new OGL.Renderer({ dpr: 2, alpha: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    // 2. Shaders (Distortion Logic)
    const vertex = `
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
      }
    `;

    const fragment = `
      precision highp float;
      uniform sampler2D tWater;
      uniform sampler2D tFlow;
      varying vec2 vUv;
      uniform vec4 res;

      void main() {
        vec3 flow = texture2D(tFlow, vUv).rgb;
        vec2 uv = .5 * gl_FragCoord.xy / res.xy;
        
        // Multi-layered offset to create the "Liquid" ripple
        vec2 myUV = (uv - vec2(0.5)) * res.zw + vec2(0.5);
        myUV -= flow.xy * 0.18; // Increased intensity for shine

        vec3 tex = texture2D(tWater, myUV).rgb;
        gl_FragColor = vec4(tex, 1.0);
      }
    `;

    const flowmap = new OGL.Flowmap(gl, { falloff: 0.3, dissipation: 0.92 });
    const geometry = new OGL.Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
    });

    const texture = new OGL.Texture(gl, { minFilter: gl.LINEAR, magFilter: gl.LINEAR });
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = "https://robindelaporte.fr/codepen/bg3.jpg"; // High contrast image for shine
    img.onload = () => (texture.image = img);

    const program = new OGL.Program(gl, {
      vertex,
      fragment,
      uniforms: {
        tWater: { value: texture },
        res: { value: new OGL.Vec4(0, 0, 0, 0) },
        tFlow: flowmap.uniform
      }
    });
    
    const mesh = new OGL.Mesh(gl, { geometry, program });

    // 3. Responsive Resize
    function resize() {
      if (!container) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.setSize(width, height);
      
      const imageAspect = 1638 / 2048;
      let a1, a2;
      if (height / width < imageAspect) {
        a1 = 1; a2 = (height / width) / imageAspect;
      } else {
        a1 = (width / height) * imageAspect; a2 = 1;
      }
      program.uniforms.res.value.set(width, height, a1, a2);
    }

    // 4. Mouse Tracking (relative to container)
    const mouse = new OGL.Vec2(-1);
    const velocity = new OGL.Vec2();
    let lastTime, lastMouse = new OGL.Vec2();

    function updateMouse(e) {
      const x = e.pageX || (e.changedTouches && e.changedTouches[0].pageX);
      const y = e.pageY || (e.changedTouches && e.changedTouches[0].pageY);
      const rect = container.getBoundingClientRect();
      
      mouse.set((x - rect.left) / rect.width, 1.0 - (y - rect.top) / rect.height);

      if (!lastTime) {
        lastTime = performance.now();
        lastMouse.set(x, y);
      }

      const deltaX = x - lastMouse.x;
      const deltaY = y - lastMouse.y;
      const time = performance.now();
      const delta = Math.max(10.4, time - lastTime);
      
      velocity.x = deltaX / delta;
      velocity.y = deltaY / delta;
      velocity.needsUpdate = true;
      lastTime = time;
      lastMouse.set(x, y);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("touchmove", updateMouse);
    resize();

    let animationId;
    function update() {
      animationId = requestAnimationFrame(update);
      if (!velocity.needsUpdate) { mouse.set(-1); velocity.set(0); }
      velocity.needsUpdate = false;
      
      flowmap.mouse.copy(mouse);
      flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1);
      flowmap.update();
      renderer.render({ scene: mesh });
    }
    update();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("touchmove", updateMouse);
      if (container && gl.canvas) container.removeChild(gl.canvas);
    };
  }, [isMounted]);

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] bg-black flex items-center justify-center overflow-hidden">
      
      {/* 1. Deep Black Background with subtle center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)]" />

      {/* 2. WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-0 opacity-80" />

      {/* 3. SHINE LAYER: Text Mask with High Contrast Gradient */}
      <div className="absolute inset-0 z-10 flex items-center justify-center mix-blend-screen pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-white via-gray-300 to-white flex items-center justify-center">
          <h1 className="text-[20vw] font-black tracking-tighter text-black select-none leading-none">
            JUSTUS
          </h1>
        </div>
      </div>

      {/* 4. Optional: Top & Bottom Glass reflection bars */}
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
    </div>
  );
};

export default LiquidChromeLogo;