import Button from '@ui/button';

const SearchForm = () => (
	<div className="input-group">
		<div className="input-group-append">
			<Button color="primary-alta" size="small" className="lh-1">
				<i className="feather-search" />
			</Button>
		</div>
		<input
			type="text"
			placeholder="ابحث هنا..."
			className="form-control bg-color--2"
		/>
		
	</div>
);

export default SearchForm;
