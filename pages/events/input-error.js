import React from 'react';

const InputError = ({ error }) => (
	<React.Fragment>
		<div style={{color: "red"}} className="ant-form-item-explain ant-form-item-explain-error">
			<div role="alert">{error}</div>
		</div>
	</React.Fragment>
);

export default InputError;
