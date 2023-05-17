import React from "react";

interface FormatTimeToStringProps {
  hours: number;
  minutes: number;
  seconds: number;
  seperator?: string;
}

export const FormatTimeToString =
  ({ hours, minutes, seconds, seperator }: FormatTimeToStringProps) => {
    const formatTime = (timeUnit: number) =>
      timeUnit < 10 ? `0${timeUnit}` : `${timeUnit}`;
    const hour = formatTime(hours);
    const minute = formatTime(minutes);
    const second = formatTime(seconds);
    return (
      <p>
        {`${hour}`}
        {seperator === undefined && <span>hr</span>}
        {seperator !== undefined && (
          <span>
            <sup>hr</sup>:{" "}
          </span>
        )}
        {`${minute}`}
        {seperator === undefined && <span>min</span>}
        {seperator !== undefined && (
          <span>
            <sup>min</sup>:{" "}
          </span>
        )}
        {`${second}`}
        {seperator === undefined && <span>sec</span>}
        {seperator !== undefined && (
          <span>
            <sup>sec</sup>
          </span>
        )}
      </p>
    );
  };

