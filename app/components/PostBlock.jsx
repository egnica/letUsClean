import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "../page.module.css";
const components = {
  h2: (p) => <h2 className={styles.aboutMainH2} {...p} />,
  a: (p) => <a className={styles.aboutMainAnchor} {...p} />,
  p: (p) => <p className={styles.aboutMainParagraph} {...p} />,
  li: (p) => <li className={styles.aboutMainParagraph} {...p} />,
};
function PostBlock({ block }) {
  return (
    <div>
      {block.map((item, index) => {
        const test = index % 2 == 0;
        return item.type == "image" ? (
          <div className={test ? styles.picLeft : styles.picRight} key={index}>
            <img className={styles.imgBlock} width={"60%"} src={item.url} />
            <div className={styles.textBlock2}>
              <MDXRemote source={item.bodyMDX} components={components} />
            </div>
          </div>
        ) : item.type == "video" ? (
          <div className={styles.videoBlockCont} key={index}>
            <video
              className={styles.videoBlock}
              width={"80%"}
              controls
              src={item.url}
            />
            <div className={styles.textBlock}>
              <MDXRemote source={item.bodyMDX} components={components} />
            </div>
          </div>
        ) : (
          <div key={index} className={styles.textBlock}>
            <MDXRemote source={item.bodyMDX} components={components} />
          </div>
        );
      })}
    </div>
  );
}

export default PostBlock;
