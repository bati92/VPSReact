import { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const RankingArea = ({ className, space, data }) => {
	useEffect(() => {
		// Any necessary data operations can be handled here
	}, [data]);

	return (
		<div
			className={clsx(
				'rn-upcoming-area',
				space === 1 && 'rn-section-gapTop',
				className
			)}
		>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="table-title-area d-flex">
							<i className="feather-briefcase" />
							<h3>دفعاتي</h3>
						</div>
						<div className="box-table table-responsive">
							<table className="table upcoming-projects">
								<thead>
									<tr>
										<th>
											<span>القيمة </span>
										</th>
										<th>
											<span>التاريخ</span>
										</th>
										<th>
											<span>الحالة</span>
										</th>
									</tr>
								</thead>
								<tbody className="ranking">
									{data.map((order) => (
										<tr key={order.id}>
											<td>
												<span>{order.value}</span>
											</td>
											<td>
												<span>{order.created_at}</span>
											</td>
											<td>
												<span className="myspan">
													{order.status}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

RankingArea.propTypes = {
	className: PropTypes.string,
	space: PropTypes.number,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
			value: PropTypes.string.isRequired,
			created_at: PropTypes.string.isRequired,
			status: PropTypes.string.isRequired
		})
	).isRequired
};

RankingArea.defaultProps = {
	space: 1
};

export default RankingArea;
