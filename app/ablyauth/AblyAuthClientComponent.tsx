"use client";

import React, { MouseEventHandler, useState } from "react";
import Ably from "ably/promises";
import { AblyProvider, useAbly, useConnectionStateListener } from "ably/react";
import Logger, { LogEntry } from "@/(components)/Logger";

export type AblyAuthClientComponentProps = {};

const client = new Ably.Realtime.Promise({
  authUrl: "/ably",
  authMethod: "POST",
  queryTime: true,
});

const AblyAuthClientComponent = (props: AblyAuthClientComponentProps) => {
  return (
    <>
      <AblyProvider client={client}>
        <ConnectionStatus />
      </AblyProvider>
    </>
  );
};

const ConnectionStatus = () => {
  const ably = useAbly();

  const [logs, setLogs] = useState<Array<LogEntry>>([]);
  const [connectionState, setConnectionState] = useState("unknown");

  useConnectionStateListener((stateChange) => {
    setConnectionState(stateChange.current);
    setLogs((prev) => [
      ...prev,
      new LogEntry(
        `Connection state change: ${stateChange.previous} -> ${stateChange.current}`,
      ),
    ]);
  });

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-4 w-[752px] h-[124px]">
        <div className="flex flex-row justify-start items-start gap-4 pt-6 pr-6 pb-6 pl-6 rounded-lg border-slate-100 border-t border-b border-l border-r border-solid border h-[68px] bg-white min-w-[752px]">
          <div className="font-jetbrains-mono text-sm min-w-[227px] whitespace-nowrap text-rose-400 text-opacity-100 leading-normal font-medium">
            connection status
            <span className="text-zinc-200 text-opacity-100">&nbsp;</span>
            =&nbsp;
            <span className="text-violet-400 text-opacity-100">
              {connectionState}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-md w-[120px] h-10 bg-black">
          <div className="font-manrope text-base min-w-[80px] whitespace-nowrap text-white text-opacity-100 text-center leading-4 font-medium">
            <button
              onClick={() => {
                if (connectionState === "connected") {
                  ably.connection.close();
                } else if (connectionState === "closed") {
                  ably.connection.connect();
                }
              }}
            >
              {connectionState === "connected" ? "Disconnect" : "Connect"}
            </button>
          </div>
        </div>
      </div>
      <Logger logEntries={logs} displayHeader={true} />
    </>
  );
};

export default AblyAuthClientComponent;
