import React, { useState, useContext, useEffect, useRef } from "react";
import { useWallet, useStream } from "../../hooks";
import { useConfig } from "../../context/configContext";
import { Model } from "../../types";
import {
  PushNotificationClient,
  PushChatClient,
  ENV,
  ModelType as PushModelType,
  getICAPAddress,
} from "@dataverse/push-client-toolkit";

import LivepeerClient, {
  LivepeerConfig,
} from "@dataverse/livepeer-client-toolkit";

import XmtpClient, {
  ModelType as XmtpModelType,
} from "@dataverse/xmtp-client-toolkit";

import TablelandClient from "@dataverse/tableland-client-toolkit";
import { Network } from "@dataverse/tableland-client-toolkit";
import { LivepeerWidget, LivepeerPlayer } from "../../components/Livepeer";
import { getModelByName } from "../../utils";

function Toolkits() {
  const { runtimeConnector, output } = useConfig();
  const [pushChannelModel, setPushChannelModel] = useState<Model>();
  const pushChatClientRef = useRef<PushChatClient>();
  const pushNotificationClientRef = useRef<PushNotificationClient>();
  const livepeerClientRef = useRef<LivepeerClient>();
  const tablelandClientRef = useRef<TablelandClient>();
  const xmtpClientRef = useRef<XmtpClient>();
  const [tableId, setTableId] = useState<string>();
  const [tableName, setTableName] = useState<string>();
  const [asset, setAsset] = useState<any>(null);

  const { address, connectWallet, switchNetwork } = useWallet();
  const { pkh, createCapability } = useStream();

  useEffect(() => {
    const appName = output.createDapp.name;
    const appSlug = output.createDapp.slug;

    const pushChatMessageModel = getModelByName(`${appSlug}_pushchatmessage`);

    const pushChannelModel = getModelByName(`${appSlug}_pushchannel`);

    const pushChatGPGKeyModel = getModelByName(`${appSlug}_pushchatgpgkey`);

    const pushNotificationModel = getModelByName(`${appSlug}_pushnotification`);

    const livepeerModel = getModelByName(`${appSlug}_livepeerasset`);

    const tablelandModel = getModelByName(`${appSlug}_table`);

    const xmtpkeycacheModel = getModelByName(`${appSlug}_xmtpkeycache`);

    const xmtpmessageModel = getModelByName(`${appSlug}_xmtpmessage`);

    if (pushChatMessageModel) {
      const pushChatClient = new PushChatClient({
        runtimeConnector,
        modelIds: {
          [PushModelType.MESSAGE]: pushChatMessageModel?.stream_id!,
          [PushModelType.USER_PGP_KEY]: pushChatGPGKeyModel?.stream_id!,
          [PushModelType.CHANNEL]: pushChannelModel?.stream_id!,
          [PushModelType.NOTIFICATION]: pushNotificationModel?.stream_id!,
        },
        appName: output.createDapp.name,
        env: ENV.STAGING,
      });
      pushChatClientRef.current = pushChatClient;
    }

    if (pushNotificationModel) {
      const pushNotificationClient = new PushNotificationClient({
        runtimeConnector,
        modelIds: {
          [PushModelType.MESSAGE]: pushChatMessageModel?.stream_id!,
          [PushModelType.USER_PGP_KEY]: pushChatGPGKeyModel?.stream_id!,
          [PushModelType.CHANNEL]: pushChannelModel?.stream_id!,
          [PushModelType.NOTIFICATION]: pushNotificationModel?.stream_id!,
        },
        appName: output.createDapp.name,
        env: ENV.STAGING,
      });
      pushNotificationClientRef.current = pushNotificationClient;
    }

    if (tablelandModel) {
      const tablelandClient = new TablelandClient({
        runtimeConnector,
        network: Network.MUMBAI,
        modelId: tablelandModel?.stream_id,
      });
      tablelandClientRef.current = tablelandClient;
    }

    if (livepeerModel) {
      const livepeerClient = new LivepeerClient({
        apiKey: (import.meta as any).env.VITE_LIVEPEER_API_KEY,
        runtimeConnector,
        modelId: livepeerModel.stream_id,
        appName,
      });
      livepeerClientRef.current = livepeerClient;
    }

    if (pushChannelModel) {
      setPushChannelModel(pushChannelModel);
    }

    if (xmtpkeycacheModel && xmtpmessageModel) {
      const xmtpClient = new XmtpClient({
        runtimeConnector,
        appName,
        modelIds: {
          [XmtpModelType.MESSAGE]: xmtpmessageModel.stream_id,
          [XmtpModelType.KEYS_CACHE]: xmtpkeycacheModel.stream_id,
        },
        env: "production",
      });
      xmtpClientRef.current = xmtpClient;
    }
  }, []);

  const connect = async () => {
    const { wallet } = await connectWallet();
    const pkh = await createCapability(wallet);
    console.log("pkh:", pkh);
    return pkh;
  };

  // Push Notifications
  const getUserSubscriptions = async () => {
    if (!address) {
      throw new Error("address undefined");
    }
    const subscriptions =
      await pushNotificationClientRef.current?.getSubscriptionsByUser(address);
    console.log("[getUserSubscriptions]subscriptions:", subscriptions);
  };

  const getUserSpamNotifications = async () => {
    if (!address) {
      throw new Error("address undefined");
    }
    const spams =
      await pushNotificationClientRef.current?.getUserSpamNotifications(
        getICAPAddress(address)
      );
    console.log("[getUserSpamNotifications]notifications:", spams);
  };

  const getNotificationsByUser = async () => {
    const notifications =
      await pushNotificationClientRef.current?.getNotificationsByUser(
        address!,
        1,
        100
      );
    console.log("[getNotificationsByUser]notifications:", notifications);
  };

  const subscribe = async () => {
    const subscribeChannel =
      "eip155:5:0xd10d5b408A290a5FD0C2B15074995e899E944444";
    try {
      await pushNotificationClientRef.current?.subscribeChannel(
        subscribeChannel
      );
      console.log("[subscribe]done");
    } catch (error) {
      console.error(error);
    }
  };

  const unsubscribe = async () => {
    const subscribeChannel =
      "eip155:5:0xd10d5b408A290a5FD0C2B15074995e899E944444";
    try {
      await pushNotificationClientRef.current?.unsubscribeChannel(
        subscribeChannel
      );
      console.log("[unsubscribe]done");
    } catch (error) {
      console.error(error);
    }
  };

  const sendNotification = async () => {
    const sendChannel = "eip155:5:0xd10d5b408A290a5FD0C2B15074995e899E944444";
    const title = "Hello Title";
    const body = "Tom long time no see.";
    const img =
      "https://bafkreicf7ynxjjjumhrntswhtqbnkjvi24zqw3ubuvbeie3nzrylyyovye.ipfs.dweb.link";
    const cta = "";

    try {
      const res = await pushNotificationClientRef.current?.sendNotification(
        sendChannel,
        title,
        body,
        img,
        cta
      );
      console.log("[sendNotification]res:", res);
    } catch (error: any) {
      if (error?.message === "this account does not have channel") {
        console.error(
          "This Account doesn't have channel, please go to https://staging.push.org/ to create channel."
        );
      } else if (
        error?.response?.data?.error?.info ===
        "Error while verifying the verificationProof through eip712v2"
      ) {
        console.error(
          "This Account doesn't have permission to sendNotification, please use your own channel to sendNotification or create a channel on https://staging.push.org/."
        );
      }
    }
  };

  const getChannelDetail = async () => {
    const detailChannel = "eip155:5:0xd10d5b408A290a5FD0C2B15074995e899E944444";
    const channelData =
      await pushNotificationClientRef.current?.getChannelDetail(detailChannel);
    console.log("[getChannelDetail]channelData:", channelData);
  };

  const getSubscriberOfChannel = async () => {
    const queryChannel = "eip155:5:0xd10d5b408A290a5FD0C2B15074995e899E944444";
    const page = 1;
    const limit = 10;
    const subscribers =
      await pushNotificationClientRef.current?.getSubscriberOfChannel(
        queryChannel,
        page,
        limit
      );
    console.log("[getSubscriberOfChannel]subscribers:", subscribers);
  };

  const searchChannelByName = async () => {
    const searchName = "DataverseChannel";
    const channelsData =
      await pushNotificationClientRef.current?.searchChannelByName(
        searchName,
        1,
        10
      );
    console.log("[searchChannelByName]channelsData:", channelsData);
  };

  const getNotificationList = async () => {
    const noticeList =
      await pushNotificationClientRef.current?.getNotificationList();
    console.log("getNotificationList: ", noticeList);
  };

  // Push Chat
  const createPushChatUser = async () => {
    const user = await pushChatClientRef.current?.createPushChatUser();
    console.log("CreatePushChatUser: response: ", user);
  };

  const sendChatMessage = async () => {
    const msgCont = "Someting content";
    const msgType = "Text";
    const receiver = "0x13a6D1fe418de7e5B03Fb4a15352DfeA3249eAA4";

    const response = await pushChatClientRef.current?.sendChatMessage(
      receiver,
      msgCont,
      msgType
    );

    console.log("sendChatMessage: response: ", response);
  };

  const fetchHistoryChats = async () => {
    const receiver = "0x13a6D1fe418de7e5B03Fb4a15352DfeA3249eAA4";
    const limit = 30;

    const response = await pushChatClientRef.current?.fetchHistoryChats(
      receiver,
      limit
    );

    console.log("FetchHistoryChats: response: ", response);
  };

  const getChatMessageList = async () => {
    const msgList = await pushChatClientRef.current?.getMessageList();
    console.log("ChatMessageList: response: ", msgList);
  };

  // Tableland
  const createTable = async () => {
    await switchNetwork(80001);

    const CREATE_TABLE_SQL =
      "CREATE TABLE test_table (id integer primary key, record text)";
    console.log(tablelandClientRef.current);
    const res = await tablelandClientRef.current?.createTable(CREATE_TABLE_SQL);
    setTableId(res?.tableId);
    setTableName(`${res?.tableName}_${res?.chainId}_${res?.tableId}`);
    console.log("CreateTable: response: ", res);
  };

  const insertTable = async () => {
    const MUTATE_TABLE_SQL = `INSERT INTO ${tableName} (id, record) values(1, 'hello man01')`;

    const res = await tablelandClientRef.current?.mutateTable(
      tableId!,
      MUTATE_TABLE_SQL
    );
    console.log("InsertTable: response: ", res);
  };

  const updateTable = async () => {
    const UPDATE_TABLE_SQL = `UPDATE ${tableName} SET record = 'hello man02' WHERE id = 1`;

    const res = await tablelandClientRef.current?.mutateTable(
      tableId!,
      UPDATE_TABLE_SQL
    );
    console.log("UpdateTable: response: ", res);
  };

  const getTableByTableId = async () => {
    const tablelandClient = tablelandClientRef.current;
    const tableName = await tablelandClient?.getTableNameById(tableId!);
    if (tableName) {
      const result = await tablelandClient?.getTableByName(tableName);
      console.log("GetTableByTableId:", result);
    } else {
      console.error("getTableNameById failed");
    }
  };

  const getTableList = async () => {
    const tablelandClient = tablelandClientRef.current;
    const tables = await tablelandClient?.getTableList();
    console.log("tables: ", tables);
  };

  // Xmtp
  const isUserOnNetowork = async () => {
    const isOnNetwork = await xmtpClientRef.current?.isUserOnNetwork(
      address,
      "production"
    );
    console.log("isUserOnNetowork:", isOnNetwork);
  };

  const sendMessageToMsgReceiver = async () => {
    const msgReceiver = "0x13a6D1fe418de7e5B03Fb4a15352DfeA3249eAA4";

    const res = await xmtpClientRef.current?.sendMessageTo({
      user: msgReceiver,
      msg: "Hello! Nice to meet you.",
    });
    console.log("[sendMessageToMsgReceiver]res:", res);
  };

  const getMessageWithMsgReceiver = async () => {
    const msgReceiver = "0x13a6D1fe418de7e5B03Fb4a15352DfeA3249eAA4";

    const msgList = await xmtpClientRef.current?.getMessageWithUser({
      user: msgReceiver,
      options: {
        endTime: new Date(),
      },
    });
    console.log("getMessageWithMsgReceiver res:", msgList);
  };

  const getPersistedMessages = async () => {
    const res = await xmtpClientRef.current?.getPersistedMessages();
    console.log("getPersistedMessages res:", res);
  };

  return (
    <div className="App">
      <button onClick={connect}>connect</button>
      <div className="blackText">{pkh}</div>
      <hr />
      <h2 className="label">Push Channel</h2>
      <button onClick={getUserSubscriptions}>getUserSubscriptions</button>
      <button onClick={getUserSpamNotifications}>
        getUserSpamNotifications
      </button>
      <button onClick={getNotificationsByUser}>getNotificationsByUser</button>
      <button onClick={subscribe}>subscribe</button>
      <button onClick={unsubscribe}>unsubscribe</button>
      <button onClick={sendNotification}>sendNotification</button>
      <button onClick={getChannelDetail}>getChannelDetail</button>
      <button onClick={getSubscriberOfChannel}>getSubscriberOfChannel</button>
      <button onClick={searchChannelByName}>searchChannelByName</button>
      <button onClick={getNotificationList}>getNotificationList</button>
      <br />
      <h2 className="label">Push Chat</h2>
      <button onClick={createPushChatUser}>createPushChatUser</button>
      <button onClick={sendChatMessage}>sendChatMessage</button>
      <button onClick={fetchHistoryChats}>fetchHistoryChats</button>
      <button onClick={getChatMessageList}>getChatMessageList</button>
      <br />
      <h2 className="label">Tableland</h2>
      <button onClick={createTable}>createTable</button>
      <button onClick={insertTable}>insertTable</button>
      <button onClick={updateTable}>updateTable</button>
      <button onClick={getTableByTableId}>getTableByTableId</button>
      <button onClick={getTableList}>getTableList</button>
      <br />
      <h2 className="label">Livepeer</h2>
      {livepeerClientRef.current?.reactClient && (
        <>
          <LivepeerConfig client={livepeerClientRef.current.reactClient!}>
            <LivepeerWidget
              address={address}
              livepeerClient={livepeerClientRef.current}
              setAsset={setAsset}
            />
            {asset?.id && (
              <LivepeerPlayer
                reactClient={livepeerClientRef.current.reactClient}
                playbackId={asset.playbackId}
              />
            )}
          </LivepeerConfig>
        </>
      )}
      <br />
      <h2 className="label">Xmtp</h2>
      <button onClick={isUserOnNetowork}>isUserOnNetowork</button>
      <button onClick={sendMessageToMsgReceiver}>sendMessageToMsgReceiver</button>
      <button onClick={getMessageWithMsgReceiver}>getMessageWithMsgReceiver</button>
      <button onClick={getPersistedMessages}>getPersistedMessages</button>
      <br />
    </div>
  );
}

export default Toolkits;
