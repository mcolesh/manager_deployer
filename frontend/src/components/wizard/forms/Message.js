import React from 'react';
import InlineFeedbackMessage, {
	InlineMessageAlert
} from '@nokia-csf-uxr/csfWidgets/InlineFeedbackMessage';
import PropTypes from 'prop-types';

const Message = ({ id, data, severity, maxHeight }) => (
	<InlineFeedbackMessage maxContainerHeight={maxHeight || 300}>
		<InlineMessageAlert msgId={id} alertType={severity} text={data} displayCloseButton={false} />
	</InlineFeedbackMessage>
);

Message.propTypes = {
	data: PropTypes.string.isRequired,
	severity: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	maxHeight: PropTypes.number
};

export default Message;
