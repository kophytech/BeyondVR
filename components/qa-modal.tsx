import Image from "next/image";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Euler, Vector3 } from "three";

import styles from "./qa-modal.module.css";

type Props = {
  style?: {};
  presenting: boolean;
  dummyData: {
    videoUrl: string;
    question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer: string;
  }[];
  questionIndex: number;
  answerState: number | null;
  notifyToSpeak: boolean;
};

const QAModal = ({
  style,
  presenting,
  dummyData: qaData,
  questionIndex,
  answerState,
  notifyToSpeak,
}: Props) => {
  const { camera } = useThree();
  const modalRef = useRef<any>(null);

  useEffect(() => {
    camera.layers.enable(1);
    return () => {
      camera.layers.disable(1);
    };
  }, [camera]);

  useEffect(() => {
    if (modalRef.current && camera) {
      const position = new Vector3();
      position.setFromMatrixPosition(camera.matrixWorld);
      const rotation = new Vector3();
      camera.getWorldDirection(rotation);

      modalRef.current.position.copy(position);
      modalRef.current.setRotationFromEuler(
        new Euler(rotation.x, rotation.y, rotation.z)
      );
    }
  }, [camera]);

  return (
    <>
      <Html fullscreen>
        <div className={styles.qaModal} style={style} ref={modalRef}>
          <div className={styles.qaModalInner}>
            {notifyToSpeak && (
              <h1 className={styles.notifyToSpeak}>Can you repeat please?</h1>
            )}
            <div className={styles.qaQuestionNumber}>
              Question {questionIndex + 1}
            </div>
            <div className={`${styles.qaQuestion} ${styles.wrapText}`}>
              {qaData[questionIndex].question}
            </div>
            <div className={styles.qaAnswers}>
              <div className={styles.qaAnswersAnswer} style={{ order: 1 }}>
                <div
                  className={`${styles.qaAnswersAnswerDetails} ${styles.wrapText}`}
                  style={
                    answerState === null
                      ? {}
                      : qaData[questionIndex].answer ===
                        qaData[questionIndex].answer1
                      ? answerState === 1
                        ? { color: "green" }
                        : answerState === 0
                        ? { color: "red" }
                        : {}
                      : {}
                  }
                >
                  O. {qaData[questionIndex].answer1}
                </div>
              </div>
              <div className={styles.qaAnswersAnswer} style={{ order: 2 }}>
                <div
                  className={`${styles.qaAnswersAnswerDetails} ${styles.wrapText}`}
                  style={
                    answerState === null
                      ? {}
                      : qaData[questionIndex].answer ===
                        qaData[questionIndex].answer2
                      ? answerState === 1
                        ? { color: "green" }
                        : answerState === 0
                        ? { color: "red" }
                        : {}
                      : {}
                  }
                >
                  O. {qaData[questionIndex].answer2}
                </div>
              </div>
              <div className={styles.qaAnswersAnswer} style={{ order: 3 }}>
                <div
                  className={`${styles.qaAnswersAnswerDetails} ${styles.wrapText}`}
                  style={
                    answerState === null
                      ? {}
                      : qaData[questionIndex].answer ===
                        qaData[questionIndex].answer3
                      ? answerState === 1
                        ? { color: "green" }
                        : answerState === 0
                        ? { color: "red" }
                        : {}
                      : {}
                  }
                >
                  O. {qaData[questionIndex].answer3}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Html>
    </>
  );
};

export default QAModal;
