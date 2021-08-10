import React from 'react';
import classNames from 'classnames';

import './Badge.scss';

const Badge = ({ color, onSetActive, className }) => {
	return (
		<i
			onClick={onSetActive}
			className={classNames('badge', {
				[`badge--${color}`]: color,
				active: className,
			})}></i>
	);
};

export default Badge;
