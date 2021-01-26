import { Component } from 'react';
import NoticeRow from './NoticeRow';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import NoticeView from './NoticeView';

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openArticle: null,
      articles : [
        {
          "id": 0,
          "title" : "첫번째 공지사항",
          "description" : "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세",
          "createdTime" : "2021-01-24"
        },
        {
          "id": 1,
          "title" : "두번째 공지사항",
          "description" : "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세",
          "createdTime" : "2021-01-24"
        },
        {
          "id": 2,
          "title" : "세번째 공지사항",
          "description" : "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세",
          "createdTime" : "2021-01-24"
        },
      ]
    }
  }

  onClickOpen = (id) => {
    console.log(id);
    this.setState({openArticle:this.state.articles[id]});
  }

  onClickClose = () => {
    this.setState({openArticle:null});
  }

  render() {
    const cellList = ["타이틀", "작성일"];
    const articles = this.state.articles;
    const openArticle = this.state.openArticle;
    return (
      <div>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
            {cellList.map((c, i) => { return <TableCell key={i} >{c}</TableCell> })}
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((c, i) => { return <NoticeRow key={i} article={c} onClickOpen={this.onClickOpen} /> })}
          </TableBody>
        </Table>
      </Paper>
      <NoticeView article={openArticle} onClickClose={this.onClickClose}></NoticeView>
      </div>
    );
  }
}

export default Notice;
