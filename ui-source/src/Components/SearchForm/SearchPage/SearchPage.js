// import React from "react";
// import withRouter from "../../Authentication/WithRouter";
// import SearchForm from "./SearchForm";
// import SearchResult from "./SearchResults";
//  class SearchPage extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       searchResults: [],
//       search:[]
//     };
//   }
//   componentDidMount(){
//     this.setState({search :[this.props.router.params.origin,this.props.router.params.destination]})
//     console.log(this.props.router.params.origin,this.props.router.params.destination)
// }

//    updateScheduleResults = async (origin, destination,date) =>{
    
//     let request = {
//       origin: origin,
//       destination: destination,
//       date:date
//     };
//     console.log(request);
//     const res = await fetch(
//       `http://localhost:9090/scheduleId?origin=${encodeURIComponent(
//         origin
//       )}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}`,
//       {
//         method: "GET",
//       }
//     );
//     let response = await res.json();

//     console.log(response);
//     this.setState({ searchResults: [response] });
//   }
 

//   render() {
//     return (
//       <div>
//         <SearchForm updateScheduleResults={this.updateScheduleResults}/>
//         <SearchResult scheduleList={this.state.searchResults} searchParams = {this.state.search} />

//       </div>
//     );
//   }
// }
// export default withRouter(SearchPage)
