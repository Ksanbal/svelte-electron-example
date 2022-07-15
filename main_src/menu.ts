import { Menu, shell } from "electron";

export const menu = Menu.buildFromTemplate([
  {
    label: "Menu",
    submenu: [
      {
        label: "Github",
        click: async () => {
          await shell.openExternal(
            "https://github.com/Ksanbal/svelte-electron-example"
          );
        },
      },
    ],
  },
  {
    label: "Window",
    submenu: [
      {
        role: "minimize",
      },
      {
        role: "close",
      },
      {
        role: "quit",
        label: "Quit",
      },
    ],
  },
]);
