import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

export default function CkEditor({ ...props }) {


	const CkEditor = useRef(null)
	const [isCkEditorLoaded, setIsCkEditorLoaded] = useState(false)

	useEffect(() => {
		const ckEditor = require('components/form-fields/ckEditor/CustomCkEditor').default
		CkEditor.current = {
			CkEditor: ckEditor
		}
		setIsCkEditorLoaded(true);
	}, []);

	return (
		<>
			{CkEditor.current && <CkEditor.current.CkEditor {...props} />}
		</>
	);
}