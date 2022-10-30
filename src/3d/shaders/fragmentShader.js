import { Vector2, Color } from "three"

const uniforms = {
    u_time: { type: "f", value: 0 },
    u_resolution: { type: "v2", value: new Vector2() },
    u_color: { type: "c", value: new Color(0xff0000) },
}

const fragmentShader = `
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;

void main(void) {

    float f = 20.0;
    vec2 uv = gl_FragCoord.xy / f;

    float rounded = floor(uv.x + u_time*2.0 + uv.y);

    if (mod(rounded, 2.0) == 0.0)
    {
        gl_FragColor = vec4(u_color, 1.0);   
    }
    else
    {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 0.0);   
    }    
}
`

export default fragmentShader
export { uniforms }
