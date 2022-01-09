import React from 'react'
import PollItem from './PollItem'
import { generatePaginationButtons } from '../Pagination'

class PollsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            search: (new URLSearchParams(window.location.search)).get('search')
        }

        this.searchChangeHandler = this.searchChangeHandler.bind(this)
    }

    searchChangeHandler(event) {
        this.setState({search: event.target.value})
    }

    render() {
        let pagesButtons = generatePaginationButtons(this.props.polls, this.state.search)

        return <div>
            <form className='form-group'>
                Search:
                <input onChange={this.searchChangeHandler} type='text' name='search' value={this.state.search} className='form-control' />
                <input type='submit' value='Search' className='btn btn-primary m-1' />
            </form>
            <br />
            {pagesButtons}
            <hr />

            {
                this.props.polls.polls.map((item, i) => <PollItem key={item.id} poll={item} />)
            }

            {pagesButtons}
        </div>
    }
}

export default PollsList
