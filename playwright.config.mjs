import { defineConfig } from '@playwright/test';
import net from 'node:net';
const port=Number(process.env.MARKET_TEST_PORT)||await new Promise(resolve=>{const s=net.createServer();s.listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>resolve(p));});});
process.env.MARKET_TEST_PORT=String(port);
const origin=`http://127.0.0.1:${port}`;
export default defineConfig({testDir:'./e2e',workers:1,retries:0,timeout:45_000,
  outputDir:'.test-results/screens',reporter:[['list'],['json',{outputFile:'.test-results/e2e.json'}]],
  use:{baseURL:`${origin}/market/`,viewport:{width:1440,height:1000},locale:'ru-RU',
    launchOptions:{executablePath:process.env.PW_CHROMIUM_EXECUTABLE||undefined},screenshot:'only-on-failure',trace:'off'},
  webServer:{command:`node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port ${port} --strictPort`,url:`${origin}/market/`,reuseExistingServer:false,timeout:30_000}
});
