import "./Sidebar.scss";

export default function Sidebar() {
    return <div className="sidebar">
        <form className="sidebar__form">
            <div className="sidebar__form-group">
                <label htmlFor="search">Search</label>
                <input type="text" id="search" name="search" />
            </div>
            <div className="sidebar__form-group">
                <label htmlFor="filter">Filter</label>
                <select id="filter" name="filter" defaultValue="active">
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <div className="sidebar__form-group">
                <label htmlFor="sort">Sort By</label>
                <select id="sort" name="sort" defaultValue="priority">
                    <option value="priority">Priority</option>
                </select>
                <select id="direction" name="direction" defaultValue="descending">
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>
        </form>
    </div>;
}