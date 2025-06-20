'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

export function WebGLGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader source with animated gradient
    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform float u_isDark;
      
      void main() {
        vec2 uv = v_uv;
        
        // Create animated waves
        float wave1 = sin(uv.x * 3.0 + u_time * 0.5) * 0.5 + 0.5;
        float wave2 = cos(uv.y * 2.0 + u_time * 0.3) * 0.5 + 0.5;
        float wave3 = sin((uv.x + uv.y) * 2.5 + u_time * 0.7) * 0.5 + 0.5;
        
        // Combine waves
        float intensity = (wave1 + wave2 + wave3) / 3.0;
        
        // Color based on theme
        vec3 color1, color2, color3;
        if (u_isDark > 0.5) {
          color1 = vec3(0.227, 0.557, 0.965); // #3A8EF6
          color2 = vec3(0.420, 0.275, 0.757); // #6B46C1
          color3 = vec3(0.361, 0.957, 0.627); // #5CF4A0
        } else {
          color1 = vec3(0.678, 0.847, 0.902); // Light blue
          color2 = vec3(0.761, 0.698, 0.933); // Light purple
          color3 = vec3(0.698, 0.933, 0.776); // Light green
        }
        
        vec3 finalColor = mix(mix(color1, color2, uv.x), color3, intensity);
        
        gl_FragColor = vec4(finalColor, 0.3);
      }
    `;

    // Create shader function
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    // Create program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    // Set up geometry
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const isDarkLocation = gl.getUniformLocation(program, 'u_isDark');

    // Resize canvas
    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const startTime = Date.now();
    function animate() {
      const currentTime = (Date.now() - startTime) / 1000;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(timeLocation, currentTime);
      gl.uniform1f(isDarkLocation, theme === 'dark' ? 1.0 : 0.0);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
