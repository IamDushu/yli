import { memo } from "react";
import classNames from "classnames";
import { FormControl, FormHelperText } from "@mui/material";
import { Mention, MentionsInput } from "react-mentions";
import {
  defaultMentionStyle,
  mentionInputClassName,
  useStyles,
} from "./styles";

const YliwayMention = (props) => {
  const classes = useStyles(props);

  return (
    <FormControl
      className={classNames(classes.root, props.className)}
      error={props.error}
      variant="filled"
      color="primary"
      fullWidth
    >
      <MentionsInput
        allowSpaceInQuery={props.allowSpaceInQuery}
        allowSuggestionsAboveCursor={props.allowSuggestionsAboveCursor}
        className={classNames(mentionInputClassName)}
        inputRef={props.inputRef}
        disabled={props.disabled}
        onChange={props.onChange}
        singleLine={!props.multiline}
        value={props.value}
        spellCheck={props.spellCheck}
        placeholder={props.placeholder}
      >
        <Mention
          appendSpaceOnAdd={props.appendSpaceOnAdd}
          displayTransform={props.displayTransform}
          isLoading={props.isLoading}
          markup={props.markup}
          onAdd={props.onAdd}
          renderSuggestion={props.renderSuggestion}
          trigger={props.trigger}
          data={props.data}
          style={{
            ...defaultMentionStyle,
          }}
        />
      </MentionsInput>

      <FormHelperText sx={{ p: 0, m: 0, mt: 1 }}>
        {props.helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default memo(YliwayMention);
