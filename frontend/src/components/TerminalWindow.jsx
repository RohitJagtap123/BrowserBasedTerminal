import React, { useEffect, useRef } from "react";
import { Terminal as XTerminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import { io } from "socket.io-client";
import { useParams } from "react-router";

function TerminalWindow() {
  const terminalRef = useRef(null);
  const termRef = useRef(null);
  const fitAddonRef = useRef(null);
  const { language } = useParams();

  useEffect(() => {
    const socket = io("http://localhost:3000");

    const term = new XTerminal({
      cursorBlink: true,
      fontSize: 14,
      theme: {
        background: "#1e1e1e",
        foreground: "#ffffff",
        cursor: "#00ff00",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);
    fitAddon.fit();

    let isReady = false;
    let spinnerInterval;
    const spinnerFrames = ['|', '/', '-', '\\'];
    let frameIndex = 0;

    // Start terminal spinner
    const startSpinner = () => {
      spinnerInterval = setInterval(() => {
        term.write(`\rInitializing Terminal... ${spinnerFrames[frameIndex]}`);
        frameIndex = (frameIndex + 1) % spinnerFrames.length;
      }, 150);
    };

    // Stop spinner
    const stopSpinner = () => {
      clearInterval(spinnerInterval);
      term.write('\r\n');
      term.write('\n');
      setTimeout(() => {
        socket.emit("data", "clear\n"); // clear docker terminal screen
      }, 100);
    };

    startSpinner();

    term.onData((data) => {
      if (isReady) {
        socket.emit("data", data);
      }
    });

    socket.on("data", (data) => {
      if (!isReady && data.includes("#")) {
        isReady = true;
        stopSpinner();
      }

      if (isReady) {
        term.write(data);
      }
    });

    socket.on("connect", () => {
      socket.emit("select-language", language.toLowerCase());
    });

    window.addEventListener("resize", () => fitAddon.fit());

    termRef.current = term;
    fitAddonRef.current = fitAddon;

    return () => {
      clearInterval(spinnerInterval);
      socket.disconnect();
      term.dispose();
    };
  }, [language]);

  return (
    <div className="w-full min-h-screen bg-[#111111] px-10">
      <h1
        className="text-3xl font-bold text-white py-5 px-10 bg-[#111111] z-50"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        Shellify {language} Terminal
      </h1>

      <div style={{ paddingTop: "80px", height: "100vh" }}>
        <div
          id="terminal"
          ref={terminalRef}
          style={{
            width: "100%",
            height: "100%",
            padding: "10px",
            backgroundColor: "#1e1e1e",
          }}
        />
      </div>
    </div>
  );
}

export default TerminalWindow;
