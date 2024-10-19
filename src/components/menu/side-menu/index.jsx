import PropTypes from 'prop-types';

const SideMenu = ({ menu }) => (
	<nav className="mainmenu-nav">
		<ul className="mainmenu list-group">
			{menu?.map((nav) => (
				<li key={nav.id} className="nav-item">
					<a
						className="nav-link smoth-animation"
						href={`http://localhost:3000/${nav.path}`} // Use a regular anchor tag for external links
						target="_blank" // Open in a new tab if needed
						rel="noopener noreferrer" // Security measure when using target="_blank"
					>
						{nav?.icon && <i className={nav.icon} />}
						{nav.text}
					</a>
				</li>
			))}
		</ul>
	</nav>
);

SideMenu.propTypes = {
	menu: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
			path: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			icon: PropTypes.string
		})
	).isRequired
};

export default SideMenu;
