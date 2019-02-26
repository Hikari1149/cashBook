import React from 'react';
/*function Tab(children){
    return <React.Fragement>{children}</React.Fragement>;
}
*/
class Tabs extends React.Component {
    constructor(props){
        super(props);
        this.state={
            activeIndex:props.activeIndex
        }
    }
    TabChange=(event,index)=>{
        event.preventDefault();
        this.setState({
            activeIndex:index
        });
        this.props.onTabChange(event,index);//
    };
    render(){
        const {children}=this.props;
      //  console.log(this.state.activeIndex);
        return <ul className="nav nav-tabs nav-fill my-4">
            {
                React.Children.map(children,(child,index)=>{
                    const TabClass=(this.state.activeIndex===index)? 'btn btn-outline-primary':'btn btn-sm btn-outline-secondary';
                    return <li className="nav-item" key={index}>
                    <a
                        className={TabClass}
                         onClick={(event)=>{this.TabChange(event,index)}}
                    >
                        {child}
                    </a>
                    </li>
                })

            }
        </ul>
    }
}
export default  Tabs;

