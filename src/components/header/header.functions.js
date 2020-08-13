import { ActiveRoute } from '@core/routes/ActiveRoute';

export function headerNavigationHandler($target) {
    const deleteTable = $target.closest('#deleteCurrentTable');
    const goToDashboard = $target.closest('#goToDashboard');
    const url = '#dashboard';
    if (deleteTable.$el) {
        const decision = confirm('Do you really wand to delete this table');
        if (decision) {
            localStorage.removeItem('excel:' + ActiveRoute.param);
            ActiveRoute.navigate(url);
        }
    } else if (goToDashboard.$el) {
        ActiveRoute.navigate(url);
    }
}
