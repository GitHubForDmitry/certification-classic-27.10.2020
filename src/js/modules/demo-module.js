/**
 * @fileOverview Это демо файл для проверки сборки и примера организации кода
 */

import $ from 'js#/lib/jquery';
import { handleFilterChange } from 'js#/modules/handleFilterChange';
import { getSearchParams } from 'js#/modules/getSearchParams';

export const demo = () => {
	console.log('DEMO Module');
	console.log('jQuery Version: ' + $.fn.jquery);
	handleFilterChange($(document));
	getSearchParams();
};
