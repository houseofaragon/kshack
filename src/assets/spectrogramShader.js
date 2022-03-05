export const vertexShader = `
			attribute float displacement;
			uniform vec3 vLut[256];
			varying vec3 vColor;

			void main()
			{

				int index = int(displacement);
				vColor = vLut[index];
				vec3 newPosition = position + normal*displacement/25.5;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition,1.0);
			}
`

export const fragmentShader = `
		varying vec3 vColor;

				void main()
				{
					gl_FragColor 	= vec4(vColor,1.0);
				}
`