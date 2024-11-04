import { catchError } from "@keybr/debug";
import { KeyboardProvider } from "@keybr/keyboard";
import { schedule } from "@keybr/lang";
import { type Lesson } from "@keybr/lesson";
import { LessonLoader } from "@keybr/lesson-loader";
import { LoadingProgress } from "@keybr/pages-shared";
import { type Result, useResults } from "@keybr/result";
import { useSettings } from "@keybr/settings";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { Controller } from "./Controller.tsx";
import { displayEvent, Progress } from "./state/index.ts";

export function PracticeScreen({
  onConfigure,
}: {
  readonly onConfigure: () => void;
}): ReactNode {
  return (
    <KeyboardProvider>
      <LessonLoader>
        {(lesson) => (
          <ProgressUpdater lesson={lesson} onConfigure={onConfigure} />
        )}
      </LessonLoader>
    </KeyboardProvider>
  );
}

function ProgressUpdater({
  lesson,
  onConfigure,
}: {
  readonly lesson: Lesson;
  readonly onConfigure: () => void;
}): ReactNode {
  const { results, appendResults } = useResults();
  const [progress] = useProgress(lesson, results);
  if (progress == null) {
    return <LoadingProgress />;
  } else {
    return (
      <Controller
        progress={progress}
        onResult={(result) => {
          if (result.validate()) {
            progress.append(result, displayEvent);
            appendResults([result]);
          }
        }}
        onConfigure={onConfigure}
      />
    );
  }
}

function useProgress(lesson: Lesson, results: readonly Result[]) {
  const { settings } = useSettings();
  const progress = useMemo(() => {
    let p = new Progress(settings, lesson);
    p.seed(lesson.filter(results));
    return p;
  }, [settings, lesson]);
  return [progress] as const;
}
