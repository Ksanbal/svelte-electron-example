import { app, BrowserWindow, Menu } from "electron";
import * as path from "path";
import * as isDEV from "electron-is-dev";
import { menu } from "./menu";

// 상단 메뉴바 설정
Menu.setApplicationMenu(menu);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 1920 / 2,
    fullscreen: !isDEV,
  });
  mainWindow.loadURL(
    isDEV
      ? "http://localhost:8080"
      : `file://${path.join(__dirname, "../render_build/index.html")}`
  );
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
