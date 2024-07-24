import React, { memo } from 'react';

const Footer = memo(props => {
    const { setStatusFilter, status, clearCompleted } = props
    const filterBtns = [{
        title: 'Tất cả',
        isActived: status === 'ALL',
        onClick: () => setStatusFilter('ALL'),
        link: ''
    },{
        title: 'Chưa hoàn thành',
        isActived: status === 'ACTIVE',
        onClick: () => setStatusFilter('ACTIVE'),
        link: 'active'
    },{
        title: 'Hoàn thành',
        isActived: status === 'COMPLETED',
        onClick: () => setStatusFilter('COMPLETED'),
        link: 'completed'
    }]
    return (
        <footer className='footer'>
            <ul className='filters'>
                {
                    filterBtns.map(btn => (
                        <FilterBtn key={`btn${btn.title}`} {...btn}></FilterBtn>
                    ))
                }
            </ul>
            <button className='clear-completed btn btn-primary btn-1' onClick={clearCompleted}>Xóa việc đã xong</button>
        </footer>
    )
})

const FilterBtn = memo(props => {
    const { title, link, onClick, isActived } = props
    return (
        <>
            <li>
                <a href={`#/${link}`} className={`${isActived}` ? 'selected' : ''} onClick={onClick}>
                    {title}
                </a>
            </li>
        </>
    )
})

export default Footer