import { createStyles, makeStyles } from "@mui/styles";

export const mentionInputClassName = "yliway-mention-input";
export const floatingLabelClassName = "yliway-mention-input-floating-label";

const paddingTop = "19px";
const paddingBottom = "19px";
const padding = `${paddingTop} 100px ${paddingBottom} 16px`;
const fontSize = `12px`;
const lineHeight = `16px`;
const color = "#49454E";

const getPlaceholderStyle = (isSuperscript) => ({
  top: isSuperscript ? 0 : paddingTop,
  fontSize: isSuperscript ? 0.75 * fontSize : fontSize,
});

export const useStyles = makeStyles(({ palette, transitions }) => {
  return createStyles({
    root: (props) => ({
      [`& .${mentionInputClassName}__control`]: {
        fontSize,
        lineHeight,
        color,
      },

      [`& .${mentionInputClassName}__input`]: {
        backgroundColor: `#E6E1E6 !important`,
        padding,
        border: 0,
        borderBottom: props?.error
          ? `2px solid ${palette.error?.main}`
          : `1px solid ${palette?.divider}`,
        color: palette?.text?.primary,
        transition: transitions?.create("border-bottom-color", {
          duration: transitions?.duration?.shorter,
          easing: transitions?.easing?.easeInOut,
        }),

        "&:focus": {
          outline: "none",
          borderBottom: !props?.error && `2px solid ${palette?.primary?.main}`,
        },
        "&:disabled": {
          color: palette?.text?.disabled,
          borderBottom: !props?.error && `1px dotted ${palette?.divider}`,
        },
        "&:hover:not(:disabled):not(:focus)": {
          borderBottom: !props?.error && `2px solid ${palette?.divider}`,
        },
      },

      [`& .${mentionInputClassName}__highlighter`]: {
        padding,
      },

      [`& .${mentionInputClassName}__suggestions`]: {
        backgroundColor: `${palette?.background?.paper} !important`,
        marginTop: `calc(${paddingTop} + ${paddingBottom}) !important`,
        border: `1px solid ${palette?.action?.disabledBackground} !important`,
        boxShadow: `0 0 8px ${palette?.action?.disabled} important`,
        width: "100% !important",
        maxHeight: 300,
        overflow: "auto",
      },

      [`& .${mentionInputClassName}__suggestions__item`]: {
        display: "flex",
        alignItems: "center",

        padding: "0px 8px !important",
        transition: transitions?.create("background-color", {
          duration: transitions?.duration?.shortest,
          easing: transitions?.easing?.easeInOut,
        }),
      },

      [`& .${mentionInputClassName}__suggestions__item--focused`]: {
        backgroundColor: palette?.action?.selected,
      },

      [`& .${floatingLabelClassName}`]: () => {
        let color = palette?.text?.secondary;

        if (props.error) {
          color = palette?.error?.main;
        } else if (props.disabled) {
          color = palette?.text?.disabled;
        }

        return {
          ...getPlaceholderStyle(Boolean(props.value)),
          color,
          fontWeight: "normal",
          position: "absolute",
          pointerEvents: "none",
          transition: transitions?.create("all", {
            duration: transitions?.duration?.shorter,
            easing: transitions?.easing?.easeInOut,
          }),
        };
      },

      "&:focus-within": {
        [`& .${floatingLabelClassName}`]: {
          ...getPlaceholderStyle(true),
          color: !props?.error && palette?.primary?.main,
        },
      },
    }),
  });
});

export const defaultMentionStyle = {
  backgroundColor: "red",
  opacity: 0.3,
  padding: 1,
  marginLeft: -1,
  borderRadius: 3,
};
