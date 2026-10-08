import { useEffect, useRef } from "react";
import { usePageMotion } from "./Motion";

const vertex = `attribute vec2 a_position; varying vec2 v_uv;
void main(){v_uv=a_position*0.5+0.5; gl_Position=vec4(a_position,0.,1.);}`;
const fragment = `precision mediump float;
varying vec2 v_uv; uniform float u_time; uniform vec2 u_resolution;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);}
float fbm(vec2 p){float n=0.;float a=.5;for(int i=0;i<4;i++){n+=a*noise(p);p=p*2.03+12.3;a*=.5;}return n;}
void main(){
 vec2 uv=v_uv;float t=u_time*.075;
 vec2 p=uv*vec2(u_resolution.x/u_resolution.y,1.);
 float flow=fbm(p*1.5+vec2(t,-t*.45));
 float fold=sin(p.x*2.4+p.y*3.5+flow*5.2-t);
 float fold2=sin(p.x*1.1-p.y*4.2+flow*3.1+t*.6);
 vec3 burnt=vec3(.77,.20,.075), orange=vec3(.98,.39,.13), gold=vec3(1.,.72,.29);
 vec3 color=mix(burnt,orange,smoothstep(-.8,.8,fold));
 color=mix(color,gold,smoothstep(.12,1.,fold2)*.78);
 float glow=exp(-length((uv-vec2(.9,.9))*vec2(1.1,1.8))*3.5);
 color+=vec3(.11,.07,.03)*glow;
 color+=(hash(gl_FragCoord.xy)-.5)*.035;
 gl_FragColor=vec4(color,1.);
}`;

// A bounded, decorative shader. The photograph remains as the no-WebGL fallback.
export default function Atmosphere() {
  const canvasRef = useRef(null);
  const { enabled } = usePageMotion();
  const enabledRef = useRef(enabled);
  const resumeRef = useRef(null);
  useEffect(() => {
    enabledRef.current = enabled;
    resumeRef.current?.();
  }, [enabled]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    });
    if (!gl) return;
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };
    const vs = compile(gl.VERTEX_SHADER, vertex),
      fs = compile(gl.FRAGMENT_SHADER, fragment);
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      return;
    }
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const time = gl.getUniformLocation(program, "u_time"),
      resolution = gl.getUniformLocation(program, "u_resolution");
    let frame = 0,
      visible = false,
      last = 0,
      elapsed = 0,
      disposed = false,
      contextLost = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const draw = () => {
      if (contextLost) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      canvas.dataset.ready = "true";
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = Math.min(1, 960 / Math.max(rect.width, 1));
      canvas.width = Math.max(1, Math.round(rect.width * scale));
      canvas.height = Math.max(1, Math.round(rect.height * scale));
      draw();
    };
    const tick = (now) => {
      if (
        disposed ||
        contextLost ||
        !visible ||
        document.hidden ||
        !enabledRef.current ||
        reduced.matches
      ) {
        frame = 0;
        last = 0;
        return;
      }
      if (enabledRef.current && !reduced.matches && now - last >= 1000 / 24) {
        elapsed += last ? Math.min((now - last) / 1000, 0.1) : 0;
        last = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const resume = () => {
      if (
        visible &&
        !document.hidden &&
        !frame &&
        !contextLost &&
        enabledRef.current &&
        !reduced.matches
      )
        frame = requestAnimationFrame(tick);
    };
    resumeRef.current = resume;
    reduced.addEventListener("change", resume);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) resume();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
      }
    });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", resume);
    const onLost = (event) => {
      event.preventDefault();
      contextLost = true;
      canvas.dataset.ready = "false";
      cancelAnimationFrame(frame);
      frame = 0;
    };
    canvas.addEventListener("webglcontextlost", onLost);
    resize();
    return () => {
      disposed = true;
      resumeRef.current = null;
      reduced.removeEventListener("change", resume);
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", resume);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);
  return (
    <canvas ref={canvasRef} className="atmosphere-canvas" aria-hidden="true" />
  );
}
