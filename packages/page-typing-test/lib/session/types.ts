import {
  type Line,
  type LineList,
  type Stats,
  type TextDisplaySettings,
  type TextInputSettings,
} from "@keybr/textinput";
import { type AnyEvent } from "@keybr/textinput-events";

export enum DurationType {
  Time = 1,
  Length = 2,
}

export type Duration = {
  readonly type: DurationType;
  readonly value: number;
};

export type Progress = {
  /** Time passed in millis. */
  readonly time: number;
  /** Chars inputted. */
  readonly length: number;
  /** Progress made, [0, 1]. */
  readonly progress: number;
};

export type SessionSettings = {
  readonly duration: Duration;
  readonly textInput: TextInputSettings;
  readonly textDisplay: TextDisplaySettings;
  readonly numLines: number;
  readonly numCols: number;
};

export type SessionLine = Line & {
  readonly index: number;
  readonly mark: unknown;
  readonly text: string;
  readonly progress: Progress | null;
};

export type SessionLines = LineList<SessionLine>;

export type TestResult = {
  readonly stats: Stats;
  readonly events: readonly AnyEvent[];
};
