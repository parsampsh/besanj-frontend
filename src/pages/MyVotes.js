import IndexPage from './Index'

class MyVotesPage extends IndexPage {
    constructor(props) {
        super(props)

        this.baseUrl = 'polls/my_votes/'
        this.mainTitle = 'My Votes'
        this.requireAuth = true
    }
}

export default MyVotesPage
