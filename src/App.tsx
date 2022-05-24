import { Component, createSignal, onMount } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";

const App: Component = () => {
  const [getWs, setWs] = createSignal<WebSocket | null>(null);
  const [getCount, setCount] = createSignal(0);

  onMount(async () => {
    const url = new URL(window.location.href);
    url.protocol = "ws";
    url.pathname = "/ws";
    const ws = setWs(new WebSocket(url));

    if (!ws) {
      throw new Error("server didn't accept ws");
    }

    ws.addEventListener("open", () => {
      console.log("Opened websocket");
    });

    ws.addEventListener("message", ({ data }) => {
      const { count, tz, error } = JSON.parse(data);
      if (error) {
      } else {
        setCount(count);
      }
    });

    ws.addEventListener("close", () => {
      console.log("Closed websocket");
    });
  });

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>{getCount()}</p>
        <button onClick={() => getWs()?.send("CLICK")}>CLICK</button>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;
