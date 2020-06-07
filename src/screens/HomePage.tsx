import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { User } from '../reducer/Actions';
import firebase from 'firebase';

interface Props extends RouteComponentProps {
    user: User;
}
interface State {
    besRehNumber: number,
    DoğruBilinenYanlışlarNumber: number,
    HakkımızdaNumber: number,
    KiloAlmaNumber: number,
    KiloVermeNumber: number,
    SağlıklıYaşamNumber: number,
    SoruCevapNumber: number,

    ŞaşırtanBilgilerNumber: number,
    BlogNumber: any,
    TarifNumber: any,
    tarifNames: Array<string>,
    blogNames: Array<string>,
}

export class HomePage extends Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            besRehNumber: 0,
            DoğruBilinenYanlışlarNumber: 0,
            HakkımızdaNumber: 0,
            KiloAlmaNumber: 0,
            KiloVermeNumber: 0,
            SağlıklıYaşamNumber: 0,
            SoruCevapNumber: 0,

            ŞaşırtanBilgilerNumber: 0,
            BlogNumber: {},
            TarifNumber: {},
            tarifNames: [],
            blogNames: [],

        }

    }


    async getStatistics() {
        let Blog = await firebase.firestore().doc("/Statistics/Blog").get();
        let Tarif = await firebase.firestore().doc("/Statistics/Tarif").get();


        let besReh = await firebase.firestore().doc("/Statistics/BeslenmeRehberi").get();
        let DoğruBilinenYanlışlar = await firebase.firestore().doc("/Statistics/DoğruBilinenYanlışlar").get();
        let Hakkımızda = await firebase.firestore().doc("/Statistics/Hakkımızda").get();
        let KiloAlma = await firebase.firestore().doc("/Statistics/KiloAlma").get();
        let KiloVerme = await firebase.firestore().doc("/Statistics/KiloVerme").get();
        let SağlıklıYaşam = await firebase.firestore().doc("/Statistics/SağlıklıYaşam").get();
        let SoruCevap = await firebase.firestore().doc("/Statistics/SoruCevap").get();
        let ŞaşırtanBilgiler = await firebase.firestore().doc("/Statistics/ŞaşırtanBilgiler").get();


        //@ts-ignore
        let besRehNumber: any = besReh.data().reviewNumber;
        //@ts-ignore
        let DoğruBilinenYanlışlarNumber: any = DoğruBilinenYanlışlar.data().reviewNumber;
        //@ts-ignore
        let HakkımızdaNumber: any = Hakkımızda.data().reviewNumber;
        //@ts-ignore
        let KiloAlmaNumber: any = KiloAlma.data().reviewNumber;
        //@ts-ignore
        let KiloVermeNumber: any = KiloVerme.data().reviewNumber;
        //@ts-ignore
        let SağlıklıYaşamNumber: any = SağlıklıYaşam.data().reviewNumber;
        //@ts-ignore
        let SoruCevapNumber: any = SoruCevap.data().reviewNumber;
        //@ts-ignore
        let ŞaşırtanBilgilerNumber: any = ŞaşırtanBilgiler.data().reviewNumber;

        //@ts-ignore
        let BlogNumber: firebase.firestore.DocumentData = Blog.data();
        //@ts-ignore
        let TarifNumber: firebase.firestore.DocumentData = Tarif.data();

        let tarifNames = Object.keys(TarifNumber);
        let blogNames = Object.keys(BlogNumber);


        this.setState({
            besRehNumber,
            DoğruBilinenYanlışlarNumber,
            HakkımızdaNumber,
            KiloAlmaNumber,
            KiloVermeNumber,
            SağlıklıYaşamNumber,
            SoruCevapNumber,

            ŞaşırtanBilgilerNumber,
            BlogNumber,
            TarifNumber,
            tarifNames,
            blogNames,
        })
        console.log("hey" + this.state.blogNames);

    }

    componentDidMount() {
        this.getStatistics();
    }



    render() {
        return (
            <Container>
                <div style={{ textAlign: 'center', fontSize: '3rem' }}>Hoş geldin {this.props.user.username}</div>
                <div style={{ textAlign: "center", fontSize: '2rem', margin: 20 }}> Yazılarımız ve Okunmaları</div>

                <div style={{ fontSize: '2rem', margin: 20 }}> Blog</div>
                <ul>
                    {this.state.blogNames.map((i, index: any) => {
                        let entries = Object.values(this.state.BlogNumber);
                        let name = i;
                        return (

                            <li>
                                {name}  :  {entries[index]}
                            </li>
                        )
                    })}
                </ul>


                <div style={{ fontSize: '2rem', margin: 20 }}> Tarifler</div>
                <ul>
                    {this.state.tarifNames.map((i, index: any) => {
                        let entries = Object.values(this.state.TarifNumber);
                        let name = i;
                        return (

                            <li>
                                {name}  :  {entries[index]}
                            </li>
                        )
                    })}
                </ul>

                <div style={{ fontSize: '2rem', margin: 20 }}> Diğer İçeriklerimiz</div>

                <ul>
                    <li>
                        Beslenme Rehberi: {this.state.besRehNumber}
                    </li>
                </ul>

                <ul>
                    <li>
                        Hakkımızda: {this.state.HakkımızdaNumber}
                    </li>
                </ul>
                <ul>
                    <li>
                        Soru Cevap: {this.state.SoruCevapNumber}
                    </li>
                </ul>
                <div style={{ fontSize: '2rem', margin: 20 }}> SSS</div>
                <ul>
                    <li>
                        ŞaşırtanBilgiler: {this.state.ŞaşırtanBilgilerNumber}
                    </li>
                </ul>
                <ul>
                    <li>
                        DoğruBilinenYanlışlar: {this.state.DoğruBilinenYanlışlarNumber}
                    </li>
                </ul>
                <ul>
                    <li>
                        Kilo Verme - SSS: {this.state.KiloVermeNumber}
                    </li>
                </ul>
                <ul>
                    <li>
                        Kilo Alma - SSS: {this.state.KiloAlmaNumber}
                    </li>
                </ul>  <ul>
                    <li>
                        Sağlıklı Yaşam - SSS: {this.state.SağlıklıYaşamNumber}
                    </li>
                </ul>

                <div style={{ height: 30 }} />

            </Container>
        );
    }
}

interface StateRedux {
    user: User;
}

const mapStateToProps = (state: StateRedux) => {
    const { user } = state;
    return { user };
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
