export const getSearchParams = () => {
	const urlParams = $('form').serialize();

	history.pushState(null, null, urlParams);
	console.log(urlParams);
};
