import React from "react";

function page() {
  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        color: "#333",
      }}
    >
      <tbody>
        <tr>
          <td style={{ paddingRight: "12px" }}>
            <a href="https://letuscleanmn.com">
              <img
                src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/letusclean-logo-signature.png"
                alt="Let Us Clean MN"
                width="80"
                style={{ display: "block" }}
              />
            </a>
          </td>

          <td>
            <strong style={{ fontSize: "17px", color: "#383838" }}>
              Chelsea Jones
            </strong>
            <br />
            Owner | Let Us Clean MN
            <br />
            <div style={{ marginTop: "2px" }}>
              <a
                href="https://www.facebook.com/LetUsCleanMN"
                style={{ textDecoration: "none" }}
              >
                <img
                  src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/facebook-icon-signature.png"
                  alt="Facebook"
                  width="18"
                  style={{
                    marginRight: "6px",
                    verticalAlign: "middle",
                  }}
                />
              </a>

              <a
                href="https://share.google/KXDaVsJnGqN8G9gj6"
                style={{ textDecoration: "none" }}
              >
                <img
                  src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/google-icon-signature.png"
                  alt="Google"
                  width="18"
                  style={{ verticalAlign: "middle" }}
                />
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default page;
