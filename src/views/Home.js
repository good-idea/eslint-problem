// @flow
import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Main } from 'Components/Layout'
import type { Viewer } from 'Types'
import { BottomNav } from 'Views/Navigation'
import { withCurrentViewerQuery } from 'Queries/viewer'

import Feed from './Feed'
import Explore from './Explore'
import AddWorkPlaceholder from './AddWorkPlaceholder'
import Notifications from './Notifications'
import Profile from './Profile'
import Welcome from './Welcome'
import Work from './Work'
import ConfirmEmail from './Account/ConfirmEmail'

/**
 * Home
 */

type Props = {
	viewer: void | Viewer,
	loading: boolean,
}

const Home = (props: Props) =>
	props.loading ? null : (
		<Fragment>
			<Main>
				<Switch>
					<Route path="/welcome" render={() => <Welcome viewer={props.viewer} />} />
					<Route path="/feed" render={() => <Feed viewer={props.viewer} />} />
					<Route path="/explore" render={() => <Explore viewer={props.viewer} />} />
					<Route path="/add-work" render={() => <AddWorkPlaceholder viewer={props.viewer} />} />
					<Route path="/notifications" render={() => <Notifications viewer={props.viewer} />} />
					<Route
						path="/account/confirm/:token"
						render={({ match }) => <ConfirmEmail viewer={props.viewer} token={match.params.token} />}
					/>
					<Route
						path="/:username(@[a-zA-Z0-9-_]+)/:workSlug"
						render={({ match }) => {
							const { username, workSlug } = match.params
							if (!username || !workSlug) return null
							return <Work owner={username.replace(/^@/, '')} slug={workSlug} viewer={props.viewer} />
						}}
					/>
					<Route path="/:username(@[a-zA-Z0-9-_]+)" render={({ match }) => <Profile match={match} viewer={props.viewer} />} />
				</Switch>
			</Main>
			<BottomNav viewer={props.viewer} />
		</Fragment>
	)

export default withCurrentViewerQuery(Home)
