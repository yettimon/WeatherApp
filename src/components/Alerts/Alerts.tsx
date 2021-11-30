import React, { FC } from "react";

interface AlertProps {
  message: string;
}
export const alertComponent = (className: string): FC<AlertProps> => {
  // eslint-disable-next-line react/display-name
  return ({ message }: AlertProps) =>
    message ? <div className={`alert ${className}`}>{message}</div> : null;
};

export const ErrorAlert = alertComponent("alert-danger");
export const WarningAlert = alertComponent("alert-warning");
