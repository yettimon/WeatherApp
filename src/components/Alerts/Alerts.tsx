import React, { FC } from "react";

interface AlertProps {
  message: string;
}

const alertComponent = (className: string): FC<AlertProps> => {
  return ({ message }) =>
    message ? <div className={`alert ${className}`}>{message}</div> : null;
};

export const ErrorAlert = alertComponent("alert-danger");
export const WarningAlert = alertComponent("alert-warning");
