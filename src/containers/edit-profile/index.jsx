import Sticky from '@ui/sticky';
import TabContent from 'react-bootstrap/TabContent';
import TabContainer from 'react-bootstrap/TabContainer';
import TabPane from 'react-bootstrap/TabPane';
import Nav from 'react-bootstrap/Nav';
import PropTypes from 'prop-types';
import PersonalInformation from './personal-information';

const EditProfile = ({ authUser, token }) => (
	<div className="edit-profile-area rn-section-gapTop">
		<div className="container">
			<div className="row plr--70 padding-control-edit-wrapper pl_md--0 pr_md--0 pl_sm--0 pr_sm--0">
				<div className="col-12 d-flex justify-content-between mb--30 align-items-center">
					<h4 className="title-left">تعديل الملف الشخصي</h4>
				</div>
			</div>
			<TabContainer defaultActiveKey="nav-home">
				<div className="row plr--70 padding-control-edit-wrapper pl_md--0 pr_md--0 pl_sm--0 pr_sm--0">
					<div className="col-lg-3 col-md-3 col-sm-12">
						<Sticky>
							<nav className="left-nav rbt-sticky-top-adjust-five">
								<Nav className="nav nav-tabs">
									<Nav.Link eventKey="nav-home" as="button">
										<i className="feather-user" />
										المعلومات الشخصية
									</Nav.Link>
								</Nav>
							</nav>
						</Sticky>
					</div>
					<div className="col-lg-9 col-md-9 col-sm-12 mt_sm--30">
						<TabContent className="tab-content-edit-wrapepr">
							<TabPane eventKey="nav-home">
								<PersonalInformation
									authUser={authUser}
									token={token}
								/>
							</TabPane>
						</TabContent>
					</div>
				</div>
			</TabContainer>
		</div>
	</div>
);

EditProfile.propTypes = {
	authUser: PropTypes.object.isRequired,
	token: PropTypes.string.isRequired
};

export default EditProfile;
