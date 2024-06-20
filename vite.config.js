import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode,process.cwd(),"")
  return {
    define:{
      "process.env.REACT_APP_ENVIRONMENT":JSON.stringify(env.REACT_APP_ENVIRONMENT)
    },
    plugins: [react()],
  }
})
