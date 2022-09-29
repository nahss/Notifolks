import React, { useState } from "react";
import { constrictAddr } from "../utils";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();

  const [walletAddr, setWalletAddr] = useState(
    localStorage.getItem("walletAddr")
  );
  const [walletProvider, setWalletProvider] = useState(
    localStorage.getItem("walletProvider")
  );

  const onConnectWallet = async () => {
    if (!walletAddr || !walletProvider) {
      dispatch({
        type: "open_connect_wallet_modal",
        connectWalletModal: { openModal: true },
      });
    }
  };

  const onDisconnectWallet = () => {
    if (walletProvider === "pera") {
      // connector.killSession();
      console.log("provider");
    }

    localStorage.removeItem("walletAddr");
    localStorage.removeItem("walletProvider");

    setWalletAddr("");
    setWalletProvider("");

    window.location.reload();
  };

  return (
    <nav className="top_nav top_nav_first">
      <div className="side_top_sect">
        Noti-f
        <i className="ph-bell-simple-fill" />
        lks
      </div>
      {!!walletAddr ? (
        <div className="nav_configs" onClick={onDisconnectWallet}>
          <div className="wallet_address">
            <p className="user_wallet">{constrictAddr(walletAddr)}</p>
          </div>

          <div className="copy_button">
            <i className="ph-plugs-light"></i>
          </div>
        </div>
      ) : (
        <div className="nav_configs" onClick={onConnectWallet}>
          <div className="wallet_address">
            <p className="connect_wallet">Connect Wallet</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
