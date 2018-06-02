// @flow
import React from 'react'

/**
 * Welcome
 */

type Props = {
	name: string,
}

const Welcome = ({ name }: Props) => {
	return <div>Welcome, ${name}</div>
}

export default Welcome
