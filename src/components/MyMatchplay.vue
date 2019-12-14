<template>
<div class="my-matchplay">
    <vue-headful :title="doctitle" />
    <div v-if="loading" class="d-flex justify-content-center mb-3">
        <b-spinner big type="grow" class="m-5" style="width: 5rem; height: 5rem;"></b-spinner>
    </div>
    <div v-if="!loading">

        <!---------------------------- LOGIN --------------------------------------->
        <div v-if="showlogin">
            <b-container>
                <b-row class="mb-5 mt-5">
                    <b-col md="12" class="mt-3">
                        <h2 class="teaser-header orange">Logga in</h2>
                        <br>
                        <b-form @submit.stop.prevent @submit="login" v-if="showlogin">
                            <b-form-group>
                                <label for="email">E-post</label>
                                <b-input v-model="form.email" inputmode="email" type="email" class="form-control" id="email" placeholder="Ange din e-postadress" value required />
                            </b-form-group>
                            <b-form-group>
                                <label for="pwd">Lösenord</label>
                                <b-input v-model="form.pwd" type="password" class="form-control" id="pwd" placeholder="Ange ditt lösenord" value required />
                            </b-form-group>
                            <b-button type="submit" variant="primary" class="btn blue-bg">
                                <b-spinner v-if="showloginspinner" small type="grow" class="mr-2"></b-spinner>Logga in
                            </b-button>
                            <b-alert v-if="showerror" variant="warning" show class="mt-4 small form-text text-muted">Din e-post eller lösenord stämmer inte, försök igen eller återställ ditt lösenord.</b-alert>
                        </b-form>
                        <div class="mt-4">
                            <small><a href="#">Glömt ditt lösenord?</a></small> | <small><a href="/#register">Registrera dig</a></small>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>

        <!---------------------------- LOGGED IN --------------------------------------->
        <div v-if="!showlogin">
            <!---------------------------- STEP 0 --------------------------------------->

            <b-container v-if="team.step === 0">
                <b-row v-if="teams.length === 0 || !teams.length">
                    <b-col md="12" class="mt-3">
                        <h2 class="teaser-header orange mt-3">Hej {{userdetails.firstname}}</h2>
                    </b-col>
                    <b-col md="12">
                        <h4>Skapa ditt blivande mästarlag</h4>
                        <p>Nu är det dags att skapa ditt lag för Matchplay 2020. Klicka på knappen nedan och följ instruktionerna.</p>
                    </b-col>
                    <b-col md="12" class="pt-1 text-center">
                        <b-button variant="primary" class="blue-bg mt-5 mb-3 pulse-button btn-lg" v-on:click="create_team('new')"><i class="material-icons">sports_golf</i> Skapa ditt lag</b-button>
                    </b-col>
                </b-row>
                <b-row v-if="teams.length > 0" class="mb-2">
                    <b-col md="6" class="mt-3">
                        <h2 class="teaser-header orange">Hej {{userdetails.firstname}}</h2>
                    </b-col>
                    <b-col md="6" class="text-right">
                        <b-button variant="primary" class="blue-bg mt-3" v-on:click="create_team('new')"><i class="material-icons">sports_golf</i> Skapa ett lag</b-button>
                        <b-button @click="logoutPrompt" variant="warning" class="mt-3">Logga ut</b-button>
                    </b-col>
                    <b-col md="12" class="mb-4">
                        <hr>
                    </b-col>
                </b-row>
            </b-container>

            <!-- list of teams -->
            <b-container v-if="showteamslist && team.step === 0" class="">
                <b-row align-h="center">
                    <b-col sm="6" lg="6" class="team pl-2 pr-2 pb-2" v-for="(team,idx) in teams" :key="idx">
                        <b-card img-src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_fill,g_center,h_200,w_508/v1572963227/matchplay/c640cf_76573b7e69c04dc2bb0592399d738a17_mv2_d_4006_3000_s_4_2.jpg" img-alt="Image" img-top tag="article" class="mb-2 team">
                             <b-card-title>
                                        <span>{{team.teamname}}</span>
                                    </b-card-title>
                            <b-card-text class="mt-3">
                                <div class="pt-0 pb-3">
                                    <span :id="'tooltip-teamleader-' + idx">
                                        <i class="material-icons mr-2">person_pin</i>{{team.teamleadername}}
                                        <b-tooltip :target="'tooltip-teamleader-' + idx" triggers="hover" placement="top">
                                            Lagkaptenen för laget
                                        </b-tooltip>
                                    </span>
                                </div>

                                <div class="pt-0 pb-3">
                                    <span :id="'tooltip-course-' + idx">
                                        <i class="material-icons mr-2">golf_course</i>{{team.coursename}}
                                        <b-tooltip :target="'tooltip-course-' + idx" triggers="hover" placement="top">
                                            Hemmaklubb för matcher
                                        </b-tooltip>
                                    </span>
                                </div>

                                <div class="pt-0 pb-0">
                                    <span :id="'tooltip-nextgame-' + idx">
                                        <i class="material-icons mr-2">date_range</i>{Next game}
                                        <b-tooltip :target="'tooltip-nextgame-' + idx" triggers="hover" placement="top">
                                            Nästa match
                                        </b-tooltip>
                                    </span>
                                </div>
                            </b-card-text>
                            <template v-slot:footer>
                                <p class="mb-0" style="color:green;" v-if="team.paid">
                                    <i class="material-icons mr-2">attach_money</i>{{text.paidteam}}
                                </p>
                                <p class="mb-0" style="color:red;" v-if="!team.paid">
                                    <i class="material-icons mr-2">money_off</i>{{text.not_paidteam}}
                                </p>
                            </template>
                            <b-button hidden variant="primary" class="blue-bg">Redigera lag</b-button>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>

            <!--   -->
            <b-form class="mt-4" v-if="showcreateteam" @submit.stop.prevent @submit="save_state1">

                <!-- STEP 1 -->
                <div v-if="team.step > 0">
                    <b-container class="mb-5">
                        <b-row align-h="center">
                            <b-col md="6">

                                <b-card class="mt-4 mb-2" no-body>
                                    <b-card-header>
                                        Ditt lag<span v-if="team.name != ''">: {{team.name}}</span>
                                        <img class="overview-logo" v-bind:src="team.logo" v-if="team.type === 'Company'" />
                                    </b-card-header>
                                    <b-card-body>
                                        <b-card-text class="mt-3">
                                            <div class="pt-0 pb-3">
                                                <span id="tooltip-teamleader">
                                                    <i class="material-icons mr-2">supervised_user_circle</i> {{userdetails.firstname}} {{userdetails.lastname}}<span v-if="team.player_2_name"> & {{team.player_2_name}}</span>
                                                    <b-tooltip target="tooltip-teamleader" triggers="hover" placement="top">
                                                        Lagmedlemmar
                                                    </b-tooltip>
                                                </span>
                                            </div>

                                            <div v-if="team.type" class="pt-0 pb-3">
                                                <span id="tooltip-team-type">
                                                    <i class="material-icons mr-2">label</i>
                                                    <span v-if="team.type === 'Private'">Privat</span>
                                                    <span v-if="team.type === 'Company'">Företag</span>
                                                    <span v-if="team.company != ''">: {{team.company}}</span>
                                                    <b-tooltip target="tooltip-team-type" triggers="hover" placement="top">
                                                        Lagtyp
                                                    </b-tooltip>
                                                </span>
                                            </div>

                                            <div v-if="team.course" class="pt-0 pb-3">
                                                <span id="tooltip-course">
                                                    <i class="material-icons mr-2">golf_course</i> {{team.course}}
                                                    <b-tooltip target="tooltip-course" triggers="hover" placement="top">
                                                        Hemmaklubb för matcher
                                                    </b-tooltip>
                                                </span>
                                            </div>
                                            <div class="pt-0 pb-3">
                                                <span id="tooltip-pike">
                                                    <b-img v-if="team.shirtPicker.player1.shirt" class="mr-2" id="shirtimage1" :src="getShirtImg(team.shirtPicker.player1.shirt)"></b-img> {{team.shirtPicker.player1.size}}<br>
                                                    <b-img v-if="team.shirtPicker.player2.shirt" class="mr-2" id="shirtimage1" :src="getShirtImg(team.shirtPicker.player2.shirt)"></b-img> {{team.shirtPicker.player2.size}}
                                                    <b-tooltip target="tooltip-pike" triggers="hover" placement="top">
                                                        Pikétröjor
                                                    </b-tooltip>
                                                </span>
                                            </div>
                                        </b-card-text>
                                        <template v-slot:footer>
                                            <p class="mb-0" style="color:green;" v-if="this.paymentstatus === 'PAID'">
                                                <i class="material-icons mr-2">attach_money</i>{{text.paidteam}}
                                            </p>
                                            <p class="mb-0" style="color:GREY;" v-if="this.paymentstatus != 'PAID'">
                                                <i class="material-icons mr-2">money_off</i>{{text.not_paidteam}}
                                            </p>
                                        </template>
                                    </b-card-body>

                                </b-card>
                            </b-col>
                        </b-row>
                    </b-container>

                

                    <b-container hidden fluid class="mb-3 pl-0 pr-0">
                        <b-row class="">
                            <b-col class="" style="color:green;" v-if="team.paid">
                                <i class="material-icons mr-2" style="vertical-align: sub;">attach_money</i>{{text.paidteam}}
                            </b-col>
                            <b-col class="" style="color:red;" v-if="!team.paid">
                                <i class="material-icons mr-2" style="vertical-align: sub;">money_off</i>{{text.not_paidteam}}
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
                <div v-if="team.step ===1">

                    <b-container>
                        <b-row align-h="center">
                            <b-col md="6">
                                <b-form-group class="mb-5">
                                    <p v-if="!team.type">Vill du anmäla ett Privatlag eller Företagslag?</p>

                                    <label for="type">Välj lagtyp:</label>
                                    <b-form-select v-bind:disabled="team.is_readonly" id="type" v-model="team.type" :options="teamoptions" :state="validation_type" required>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <!-- Team name -->
                        <b-row v-if="team.type === 'Company' && !team.is_readonly" align-h="center">
                            <b-col md="6">
                                <b-form-group class="mb-5">
                                    <label for="name">Företagsnamn</label>
                                    <b-form-input id="companyname" v-model="team.company" required placeholder="Skriv in företagsnamnet" :state="validation_companyname" required>
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group class="mb-5">
                                    <label for="name">Lagnamn</label>
                                    <b-form-input aria-describedby="unique-teamname" @input="checkTeamNameUnique" id="name" v-model="team.name" required placeholder="Skriv in lagnamnet" :state="validation_name">
                                    </b-form-input>
                                    <b-form-invalid-feedback v-if="team.name != ''" id="unique-teamname">
                                        Det här lagnamnet är tyvärr upptaget. Försök med något annat.
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group class="mb-5">
                                    <label for="name">Företagslogga</label>
                                    <b-form-file @input="uploadCloudinary(this)" style="font-size:0.9em;" v-model="team.file" :state="Boolean(team.file)" placeholder="Ladda upp din företagslogga" drop-placeholder="Drop file here..." accept="image/jpeg, image/png, image/gif"></b-form-file>
                                    <b-form-input hidden id="input-logo" v-model="team.logo"></b-form-input>
                                </b-form-group>
                                <b-form-group class="text-center">
                                    <img class="mt-2" v-bind:src="team.logo" v-if="team.type === 'Company'" />
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <!-- Team name END-->

                        <b-row v-if="team.type != null" class="mt-4" align-h="center">
                            <b-col md="6">
                                <p v-if="!team.player_2_name">Anmäl en lagkamrat genom att skriva in dennes golf-ID nedan. </p>
                            </b-col>
     

                        </b-row>
                        <b-row v-if="team.type != null" align-h="center">
                            <b-col md="6">
                                <b-form-group>
                                    <label for="name">Lagkamrat:</label>
                                    <b-form-input :state="validation_teammembername" v-model="team.teammembername" inputmode="numeric" pattern="[- +()0-9]+" id="teammembername" placeholder="Golf id (xxxxxx-xxx)" required>
                                    </b-form-input>
                                    <b-button @click="checkGolfID(team.teammembername,'2')" v-if="!team.is_readonly" variant="info" size="sm" class="float-right mt-1">
                                        <b-spinner v-if="showspinner_2" small type="grow" class="mr-2"></b-spinner>Sök spelare
                                    </b-button>
                                </b-form-group>
                                <b-alert v-if="team.showplayer2" :variant="team.checkgolfidvariant2" show class="mt-4 small form-text">
                                    Spelare: {{team.player_2_name}}<br>
                                    HCP: {{team.player_2_hcp}}
                                    <b-form-input class="mt-2" v-if="!team.player_2_exists" id="teammemberemail" v-model="team.teammemberemail" placeholder="E-mail till deltagaren" :state="validation_teammemberemail" required>
                                    </b-form-input>

                                    <p class="mt-2" v-if="!team.player_2_exists">
                                        När du sparar laget kommer vi skicka en inbjudan till din lagkamrat.
                                    </p>

                                    <p class="mt-2" v-if="team.player_2_exists">
                                        {{team.player_2_name}} har ett Matchplay-konto och kommer att få en förfrågan via email om att vara med i ditt lag.
                                    </p>

                                    <b-form-input hidden v-model="team.teammembergolfid" placeholder="Golfid">
                                    </b-form-input>
                                </b-alert>
                            </b-col>

                            <!--b-col md="6">
                                <b-form-group>
                                    <label for="name">Reserv (valfri)</label>
                                    <b-form-input v-bind:readonly="team.is_readonly" id="teamreservename" v-model="team.teamreservename" placeholder="Golf id (xxxxxx-xxx)">
                                    </b-form-input>
                                    <b-button @click="checkGolfID(team.teamreservename,'3')" v-if="!team.is_readonly" variant="info" size="sm" class="float-right mt-1">
                                        <b-spinner v-if="showspinner_3" small type="grow" class="mr-2"></b-spinner>Sök spelare
                                    </b-button>
                                </b-form-group>
                                <b-alert v-if="team.showplayer3" :variant="team.checkgolfidvariant3" show class="mt-4 small form-text">
                                    Spelare: {{team.player_3_name}}<br>
                                    HCP: {{team.player_3_hcp}}

                                    <b-form-input class="mt-2" v-if="!team.player_3_exists" v-model="team.teamreserveemail" placeholder="E-mail till reserven" required>
                                    </b-form-input>

                                    <p class="mt-2" v-if="!team.player_3_exists">
                                        När du sparar laget kommer vi skicka en inbjudan till din lagkamrat
                                    </p>
                                    <p class="mt-2" v-if="team.player_3_exists">
                                        {{team.player_3_name}} har ett Matchplay-konto och kommer att få en förfrågan via email om att vara med i ditt lag.
                                    </p>
                                    <b-form-input hidden v-model="team.teamreservegolfid" placeholder="Golfid">
                                    </b-form-input>
                                </b-alert>
                            </b-col-->
                        </b-row>

                        <!-- Course -->
                        <b-row align-h="center">
                            <b-col md="6">
                                <b-form-group class="mb-5" v-if="team.type != null && !team.is_readonly">
                                    <label for="query">Välj hemmaklubb för matcher<i v-b-popover.hover.top="'Välj en klubb som ligger nära där du bor eller tänkt spela dina matcher.'" title="Hjälp" class="help material-icons mr-2">help_outline</i></label>
                                    <suggestions v-model="query" id="query" :options="options" :onInputChange="onCountryInputChange" :state="validation_query" required :onItemSelected="onSearchItemSelected" style="width:100%;">
                                        <div slot="item" slot-scope="props" class="single-item">
                                            <span class="name">{{props.item.title}}</span>
                                        </div>
                                    </suggestions>
                                    <b-form-input hidden id="clubid" v-model="team.clubid" readonly placeholder="Id på klubben">
                                    </b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>

                        <!-- NEXT STATE -->
                        <b-row align-h="center">
                            <b-col md="6">
                                <b-button @click.prevent="cancel_team()" variant="light"><i class="material-icons">arrow_back_ios</i>Tillbaka</b-button>
                                <b-button class="mt-0 mt-sm-0 float-right" @click.prevent="next()" variant="success">
                                    <b-spinner v-if="showloginspinner" small type="grow" class="mr-2"></b-spinner>Välj tröjor<i class="ml-2 material-icons">arrow_forward_ios</i>
                                </b-button>
                                <b-button hidden v-if="!team.is_readonly" @click="save_state1()" variant="primary" class="btn blue-bg">Nästa steg (tröjor)</b-button>
                                <b-button hidden variant="danger" v-if="showcreateteam" class="" v-on:click="cancel_team()">Avbryt</b-button>
                                <b-alert v-if="showerror" variant="warning" show class="mt-4 small form-text text-muted">Din e-post eller lösenord stämmer inte, försök igen eller återställ ditt lösenord.</b-alert>
                            </b-col>
                        </b-row>
                    </b-container>
                </div>

                <!-- STEP 2 TRÖJOR -->
                <div v-if="team.step === 2">
                    <b-container class="mt-3 mb-3">
                        <b-row class="mt-4">
                            <b-col class="col-12">
                                <p>
                                    Dags att välja pikeér från PING till dig och din lagkamrat. Välj 2 st pikeér totalt från herr/dam och ange storlek.
                                </p>
                            </b-col>
                        </b-row>
                    </b-container>

                    <b-container class="mt-3 mb-3">
                        <b-row class="mt-4">
                            <b-col class="col-6">
                                <b-card @click="shirtState(1)" class="pointer" :variant="team.giveaway.player1" :border-variant="team.giveaway.player1" body-bg-variant="light" :header="team.giveaway.player1header" :header-bg-variant="team.giveaway.player1" :header-text-variant="team.giveaway.player2" align="center">
                                    <b-card-text>
                                        Pikémodell: <b-img v-if="team.shirtPicker.player1.shirt" class="mr-2" id="shirtimage1" :src="getShirtImg(team.shirtPicker.player1.shirt)"></b-img><br>
                                        Storlek: {{team.shirtPicker.player1.size}}<br>
                                    </b-card-text>
                                </b-card>

                            </b-col>
                            <b-col class="col-6">
                                <b-card @click="shirtState(2)" class="pointer" :variant="team.giveaway.player12" :border-variant="team.giveaway.player2" body-bg-variant="light" :header="team.giveaway.player2header" :header-bg-variant="team.giveaway.player2" :header-text-variant="team.giveaway.player1" align="center">
                                    <b-card-text>
                                        Pikémodell: <b-img v-if="team.shirtPicker.player2.shirt" class="mr-2" id="shirtimage1" :src="getShirtImg(team.shirtPicker.player2.shirt)"></b-img><br>
                                        Storlek: {{team.shirtPicker.player2.size}}<br>
                                    </b-card-text>
                                </b-card>

                            </b-col>
                            <b-col md="12" class="mt-4">
                                <hr>
                            </b-col>
                        </b-row>
                        <b-row class="mt-4 justify-content-md-center">
                            <b-col md="3" class="text-center">
                                <b-button id="male-button" class="" @click="setGender('male')" :variant="team.shirtPicker.gender">HERR</b-button>
                                <b-button id="female-button" class="" @click="team.shirtPicker.gender = 'female'" :variant="team.shirtPicker.gender">DAM</b-button>
                            </b-col>
                        </b-row>
                        <b-row class="mt-4 justify-content-md-center">
                            <b-col md="auto" class="text-center">
                                <b-form-select inline v-model="team.giveaway.selected" :options="sizeOptions()" @change.native="myChange">
                                </b-form-select>
                            </b-col>
                        </b-row>
                    </b-container>

                    <!-- HERR -->
                    <b-container class="mt-3 mb-3" v-if="team.shirtPicker.gender === 'male'">
                        <b-row>
                            <b-col :class="{ 'selected': team.shirtPicker.selected === '1'}" class="col-6 col-md-4 p-3 text-center shirt" @click="selectShirt('1')">
                                <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_120,c_scale/v1575307928/matchplay/ping/1.png"></b-img>
                            </b-col>
                            <b-col :class="{ 'selected': team.shirtPicker.selected === '2'}" class="col-6 col-md-4 p-3 text-center shirt" @click="selectShirt('2')">
                                <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_120,c_scale/v1575307928/matchplay/ping/2.png"></b-img>
                            </b-col>
                            <b-col :class="{ 'selected': team.shirtPicker.selected === '3'}" class="col-6 col-md-4 p-3 text-center shirt" @click="selectShirt('3')">
                                <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_120,c_scale/v1575307928/matchplay/ping/3.png"></b-img>
                            </b-col>
                            <b-col :class="{ 'selected': team.shirtPicker.selected === '4'}" class="col-6 col-md-4 p-3 text-center shirt" @click="selectShirt('4')">
                                <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_120,c_scale/v1575307927/matchplay/ping/4.png"></b-img>
                            </b-col>
                            <b-col :class="{ 'selected': team.shirtPicker.selected === '5'}" class="col-6 col-md-4 p-3 text-center shirt" @click="selectShirt('5')">
                                <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_120,c_scale/v1575307926/matchplay/ping/5.png"></b-img>
                            </b-col>
                            <b-col :class="{ 'selected': team.shirtPicker.selected === '6'}" class="col-6 col-md-4 p-3 text-center shirt" @click="selectShirt('6')">
                                <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_120,c_scale/v1575307926/matchplay/ping/6.png"></b-img>
                            </b-col>
                            <b-col :class="{ 'selected': team.shirtPicker.selected === '7'}" class="col-6 col-md-4 p-3 text-center shirt" @click="selectShirt('7')">
                                <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_120,c_scale/v1575307926/matchplay/ping/7.png"></b-img>
                            </b-col>
                        </b-row>
                    </b-container>

                    <!-- DAM -->
                    <b-container class="mt-3 mb-3" v-if="team.shirtPicker.gender === 'female'">
                        <b-row>
                            <b-col :class="{ 'selected': team.shirtPicker.selected === '8'}" class="col-6 col-md-4 p-3 text-center shirt" @click="selectShirt('8')">
                                <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_120,c_scale/v1575307927/matchplay/ping/8.png"></b-img>
                            </b-col>
                            <b-col :class="{ 'selected': team.shirtPicker.selected === '9'}" class="col-6 col-md-4 p-3 text-center shirt" @click="selectShirt('9')">
                                <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_120,c_scale/v1575307927/matchplay/ping/9.png"></b-img>
                            </b-col>
                            <b-col :class="{ 'selected': team.shirtPicker.selected === '10'}" class="col-6 col-md-4 p-3 text-center shirt" @click="selectShirt('10')">
                                <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_120,c_scale/v1575307927/matchplay/ping/10.png"></b-img>
                            </b-col>
                            <b-col :class="{ 'selected': team.shirtPicker.selected === '11'}" class="col-6 col-md-4 p-3 text-center shirt" @click="selectShirt('11')">
                                <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_120,c_scale/v1575307927/matchplay/ping/11.png"></b-img>
                            </b-col>
                            <b-col :class="{ 'selected': team.shirtPicker.selected === '12'}" class="col-6 col-md-4 p-3 text-center shirt" @click="selectShirt('12')">
                                <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_120,c_scale/v1575307927/matchplay/ping/12.png"></b-img>
                            </b-col>
                            <b-col :class="{ 'selected': team.shirtPicker.selected === '13'}" class="col-6 col-md-4 p-3 text-center shirt" @click="selectShirt('13')">
                                <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_120,c_scale/v1575307927/matchplay/ping/13.png"></b-img>
                            </b-col>
                            <b-col :class="{ 'selected': team.shirtPicker.selected === '14'}" class="col-6 col-md-4 p-3 text-center shirt" @click="selectShirt('14')">
                                <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/w_120,c_scale/v1575307926/matchplay/ping/14.png"></b-img>
                            </b-col>
                        </b-row>
                    </b-container>

                    <b-container class="mt-3 mb-4 small">
                        <b-row>
                            <b-col md="12">
                                <hr>
                            </b-col>
                        </b-row>
                        <b-row align-h="center">
                            <b-col md="6" class="mt-2 mb-4">
                                <h4>Skickas till adress:</h4>
                            </b-col>
                        </b-row>

                        <b-row align-h="center">

                            <b-col md="6">

                                <b-form-input class="mb-2" id="sponsname" name="sponsname" v-model="giveawayname" required placeholder="Skriv in ditt namn" :state="validate_sponsname"></b-form-input>

                                <b-form-input class="mb-2" id="sponsaddress" name="streetaddress" v-model="team.giveaway.sponsaddress" required placeholder="Skriv in din gatuadress" :state="validate_sponsaddress"></b-form-input>

                                <b-form-input class="mb-2" id="sponszipcode" name="zipcode" v-model="team.giveaway.sponszipcode" required placeholder="Skriv in ditt postnr" :state="validate_sponszipcode"></b-form-input>

                                <b-form-input class="mb-2" id="sponscity" name="city" v-model="team.giveaway.sponscity" required placeholder="Skriv in din postort" :state="validate_sponscity"></b-form-input>
                            </b-col>
                        </b-row>
                    </b-container>

                    <b-container>
                        <b-row align-h="center">
                            <b-col md="6">
                                <b-button @click.prevent="prev()" variant="light"><i class="material-icons ml-2">arrow_back_ios</i>Tillbaka</b-button>
                                <b-button class="mt-2 mt-sm-0 float-right" @click.prevent="next()" variant="success">
                                    <b-spinner v-if="showloginspinner" small type="grow" class="mr-2"></b-spinner>Betalning<i class="ml-2 material-icons mr-2">arrow_forward_ios</i>
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-container>
                    <b-container class="mt-3 mb-4 p-0">
                        <b-row align-h="center">
                            <b-col md="auto">
                                <b-alert v-if="team.giveaway.shirtwarning" variant="warning" show class="mt-4 form-text text-muted text-center">Var snäll och välj två tröjor med storlek till ditt lag innan du betalar.</b-alert>

                            </b-col>
                        </b-row>
                    </b-container>

                </div>

                <!-- STEP 3 -->
                <div v-if="team.step === 3">
                    <b-container>
                        <b-row align-h="center">
                            <b-col md="6">
                                <b-form-group class="mb-5" v-if="team.type != null && !team.is_readonly">
                                    <h4>Betalningsalternativ</h4>

                                    <b-form-radio v-if="team.type === 'Private'" v-model="team.payment" name="some-radios" value="A">Swish</b-form-radio>
                                    <b-form-radio v-if="team.type === 'Company'" v-model="team.payment" name="some-radios" value="B">Faktura</b-form-radio>
                                    <b-form-radio v-model="team.payment" name="some-radios" value="C">Voucher/Kod</b-form-radio>
                                </b-form-group>

                                <b-form-group fluid class="mb-3" v-if="team.payment === 'A'">
                                    <b-img src="https://res.cloudinary.com/dn3hzwewp/image/upload/c_scale,w_150/v1575278258/matchplay/swish.png" alt="swish"></b-img>
                                    <span v-if="team.type==='Private'">{{team.price_private}} SEK</span>
                                    <span v-if="team.type==='Company'">{{team.price_company}} SEK (exkl. moms)</span>

                                    <vue-tel-input v-model="team.swish.mobile" v-bind="bindProps"></vue-tel-input>

                                    <b-button show @click="swish()" variant="info" size="sm" class="float-right mt-1">
                                        <b-spinner v-if="showspinner_swish" small type="grow" class="mr-2"></b-spinner>Betala
                                    </b-button>

                                    <b-alert v-if="showspinner_swish" show class="mt-5 small text-center" variant="primary">
                                        Nu kan du öppna din Swish-app och godkänna betalningen.
                                    </b-alert>

                                </b-form-group>

                                <!-- Invoice -->
                                <b-form-group v-if="team.payment === 'B'">
                                    <label for="name">Fakturauppgifter</label>
                                    <b-form-input class="mb-2" id="invoicename" name="invoicename" v-model="invoicename" required placeholder="Skriv in ditt namn" :state="validate_invoicename"></b-form-input>
                                    <b-form-input inputmode="numeric" class="mb-2" id="invoiceorgno" name="invoiceorgno" v-model="team.invoice.invoiceorgno" required placeholder="Skriv in organisationsnummer" :state="validate_invoiceorgno"></b-form-input>
                                    <b-form-input class="mb-2" id="invoiceaddress" name="invoiceaddress" v-model="team.invoice.invoiceaddress" required placeholder="Skriv in din gatuadress" :state="validate_invoiceaddress"></b-form-input>
                                    <b-form-input class="mb-2" id="invoicezip" name="invoicezip" v-model="team.invoice.invoicezip" required placeholder="Skriv in ditt postnr" :state="validate_invoicezip"></b-form-input>
                                    <b-form-input class="mb-2" id="invoicecity" name="invoicecity" v-model="team.invoice.invoicecity" required placeholder="Skriv in din postort" :state="validate_invoicecity"></b-form-input>
                                    <b-button show @click="payInvoice()" variant="info" size="sm" class="float-right mt-1">
                                        <b-spinner v-if="showspinner_invoice" small type="grow" class="mr-2"></b-spinner>Skicka in anmälan
                                    </b-button>
                                </b-form-group>

                                <!-- Voucher -->
                                <b-form-group v-if="team.payment === 'C'">
                                    <label for="name">Voucher</label>
                                    <b-form-input @focus="team.validatevoucher = true" aria-describedby="no-voucher" id="voucher" v-model="team.voucher" required placeholder="Skriv in din voucherkod här" :state="validate_voucher">
                                    </b-form-input>
                                    <b-button :disabled="!validate_voucher" show @click="payVoucher()" variant="info" size="sm" class="float-right mt-1">
                                        <b-spinner v-if="showspinner_voucher" small type="grow" class="mr-2"></b-spinner>Betala
                                    </b-button>
                                    <b-form-invalid-feedback v-if="team.voucher != ''" id="no-voucher">
                                        Din voucherkod är inte giltig.
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                
                            </b-col>
                        </b-row>
                    </b-container>
                </div>

                <!-- STEP 4 -->
                <div v-if="team.step === 4">
                    <b-container>
                        <b-row align-h="center">
                            <b-col v-if="this.paymentstatus === 'PAID'" md="6">
                                <h2 class="text-center"><i class="material-icons">favorite_border</i> Tack! <i class="material-icons">favorite_border</i></h2>
                                <p>Ditt lag är betalt och klart. Vi återkommer med information om matcher och leverans av pikéer.</p>
                                <p>Hälsningar<br>MatchPlay</p>
                            </b-col>
                            <b-col v-if="this.paymentstatus === 'DECLINED'" md="6">
                                <h2 class="text-center"><i class="material-icons">eject</i> Du valde att avbryta betalningen</h2>
                                <p>Kontakta oss om det är något som är oklart så hjälper vi till att förklara.</p>
                                <p>Hälsningar<br>MatchPlay</p>
                            </b-col>
                            <b-col v-if="this.paymentstatus === 'ERROR'" md="6">
                                <h2 class="text-center"><i class="material-icons">error</i> Något gick fel</h2>
                                <p>Försök genomföra betalningen vid ett senare tillfälle eller kontakta oss.</p>
                                <p>Hälsningar<br>MatchPlay</p>
                            </b-col>
                            <b-col v-if="this.paymentstatus === 'INVOICE'" md="6">
                                <h2 class="text-center"><i class="material-icons">favorite_border</i> Tack! <i class="material-icons">favorite_border</i></h2>
                                <p>Ditt lag är anmält och du kommer att få en faktura inom kort. Vi återkommer med information om matcher och leverans av pikéer när fakturan är betald.</p>
                                <p>Hälsningar<br>MatchPlay</p>
                            </b-col>

                        </b-row>
                        <b-row align-h="center">
                            <b-col v-if="this.paymentstatus != ''" md="6" class="text-center">
                                <b-button href="/MyMatchplay" size="lg" variant="success text-white mt-4">
                                    <i class="material-icons">
                                        done_outline
                                    </i> Klar
                                </b-button>
                            </b-col>
                        </b-row>

                    </b-container>
                </div>
            </b-form>

        </div>
    </div>
</div>
</template>

<script>
import {
    tagsMixin
} from '../mixins/tagsMixin';
import Spinner from "./spinner/Spinner";
import Suggestions from 'v-suggestions';
import 'v-suggestions/dist/v-suggestions.css';
import {
    VueTelInput
} from 'vue-tel-input'
//import Map from "./map/Map";  

const simpleDDP = require("simpleddp");
const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;

let opts = {
    endpoint: "wss://matchplay.meteorapp.com/websocket",
    SocketConstructor: WebSocket,
    reconnectInterval: 5000
};

export default {
    name: 'mymatchplay',
    components: {
        'c-spinner': Spinner,
        'suggestions': Suggestions,
        VueTelInput
        //'c-map':Map
    },
    watch: {
        '$route'(to, from) {
            if (to.path != from.path) {
                this.myscheduleid = this.$route.params.id;
                this.getSchedule();
            }

        }
    },
    data() {
        let clubs = [];
        let countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'AndorrA', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, The Democratic Republic of the', 'Cook Islands', 'Costa Rica', 'Cote D\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and Mcdonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India'];
        return {
            //mobile swish
            bindProps: {
                mode: "international",
                defaultCountry: "SE",
                disabledFetchingCountry: false,
                disabled: false,
                disabledFormatting: true,
                placeholder: "Skriv ditt mobilnummer",
                required: true,
                enabledCountryCode: true,
                enabledFlags: true,
                preferredCountries: [],
                onlyCountries: ["SE"],
                ignoredCountries: [],
                autocomplete: "on",
                name: "telephone",
                maxLen: 25,
                wrapperClasses: "",
                inputClasses: "form-control",
                dropdownOptions: {
                    disabledDialCode: false
                },
                inputOptions: {
                    showDialCode: false
                }
            },
            //TYPEAHEAD CLUBS
            query: '',
            countries: countries,
            clubs: clubs,
            selectedClub: null,
            options: {
                placeholder: 'Välj hemmaklubb för laget',
                inputClass: 'form-control course'
            },
            //GENERAL
            loading: true,
            paymentstatus: '',
            cloudinary: 'https://res.cloudinary.com/dn3hzwewp/image/upload/',
            isSelected1: false,
            isSelected2: false,
            isSelected3: false,
            isSelected4: false,
            isSelected5: false,
            isSelected6: false,
            isSelected7: false,
            isSelected8: false,
            isSelected9: false,
            isSelected10: false,
            isSelected11: false,
            isSelected12: false,
            isSelected13: false,
            isSelected14: false,

            selectedShirt1: 0,
            selectedShirt2: 0,
            //LOGIN
            showlogin: false,
            showloginspinner: false,
            showerror: false,
            //END       
            //TEAM       
            text: {
                paidteam: 'Laget är betalt',
                not_paidteam: 'Laget är inte betalt'
            },
            showcreateteam: false,
            showteamslist: false,
            showcreateteamhelper: false,
            showspinner_1: false,
            showspinner_2: false,
            showspinner_3: false,
            showspinner_swish: false,
            showspinner_voucher: false,
            teamoptions: [{
                    value: null,
                    text: 'Vänligen välj ett alternativ'
                },
                {
                    value: 'Company',
                    text: 'Företag'
                },
                {
                    value: 'Private',
                    text: 'Privat'
                }
            ],
            team: {
                step: 0,
                voucher: '',
                swish: {
                    mobile: ''
                },
                invoice: {
                    invoicename: '',
                    invoiceorgno: '',
                    invoiceaddress: '',
                    invoicezip: '',
                    invoicecity: '',
                    marketingpackage: ''
                },
                shirtPicker: {
                    selected: '',
                    gender: 'male',
                    player1: {
                        gender: 'male',
                        shirt: '',
                        size: ''
                    },
                    player2: {
                        gender: 'male',
                        shirt: '',
                        size: ''
                    }
                },
                giveaway: {
                    selected: null,
                    shirtwarning: false,
                    sponsname: '',
                    sponsaddress: '',
                    sponszipcode: '',
                    sponscity: '',
                    setSize1: '',
                    setSize2: '',
                    shirtstate: 1,
                    player1: 'success',
                    player2: 'light',
                    player1header: 'Välj piké till dig själv',
                    player2header: 'Klicka här för att välja till din lagkamrat',
                    showshirtimage: '',
                    shirt1: '',
                    shirt2: '',
                    male: true,
                    female: false,
                    malebutton: 'success',
                    femalebutton: 'light',
                    maleshirtsize1: null,
                    maleshirtsize2: null,
                    maleoptions: [{
                            value: null,
                            text: 'Välj storlek'
                        },
                        {
                            value: 'S',
                            text: 'S'
                        },
                        {
                            value: 'M',
                            text: 'M'
                        },
                        {
                            value: 'L',
                            text: 'L'
                        },
                        {
                            value: 'XL',
                            text: 'XL'
                        },
                        {
                            value: 'XXL',
                            text: 'XXL'
                        },
                        {
                            value: 'XXXL',
                            text: 'XXXL'
                        }
                    ],
                    femaleshirtsize1: null,
                    femaleshirtsize2: null,
                    femaleoptions: [{
                            value: null,
                            text: 'Välj storlek'
                        },
                        {
                            value: '34',
                            text: '34'
                        },
                        {
                            value: '36',
                            text: '36'
                        },
                        {
                            value: '38',
                            text: '38'
                        },
                        {
                            value: '40',
                            text: '40'
                        },
                        {
                            value: '42',
                            text: '42'
                        },
                        {
                            value: '44',
                            text: '44'
                        },
                        {
                            value: '46',
                            text: '46'
                        },
                        {
                            value: '48',
                            text: '48'
                        }
                    ],
                },
                _id: '',
                price_private: 1,
                price_company: 1,
                checkgolfidvariant2: 'primary',
                checkgolfidvariant3: 'primary',
                showplayer1: false,
                showplayer2: false,
                showplayer3: false,
                player_1_name: '',
                player_1_hcp: '',
                player_1_exists: false,
                player_2_name: '',
                player_2_hcp: '',
                player_2_exists: false,
                player_3_name: '',
                player_3_hcp: '',
                player_3_exists: false,
                is_readonly: true,
                type: null,
                file: null,
                logo: null,
                company: '',
                teamname: '',
                clubid: '',
                coursename: '',
                teamnamecompany: '',
                teamleader: '',
                teamleadername: '',
                teammembername: '',
                teammembergolfid: '',
                teammemberemail: '',
                teamreservename: '',
                company: '',
                name: '',
                uniquename: true,
                validatevoucher: true,
                shirts: '',
                payment: '',
                paid: ''
            },
            //END
            userdetails: {
                userId: '',
                firstname: '',
                lastname: '',
                lastname: '',
                mobile: '',
                email: ''
            },
            form: {
                email: '',
                pwd: ''
            },
            doctitle: 'Mina sidor'
        }
    },
    computed: {
        giveawayname: {
            get() {
                //perform your logic
                let userinfo = localStorage.getItem('userinfo');
                userinfo = JSON.parse(userinfo);
                this.team.giveaway.sponsname = userinfo.firstname + ' ' + userinfo.lastname;
                return userinfo.firstname + ' ' + userinfo.lastname;

            },
            set(newValue) {
                this.team.giveaway.sponsname = newValue;
            }

        },
        invoicename: {
            get() {
                //perform your logic
                let userinfo = localStorage.getItem('userinfo');
                userinfo = JSON.parse(userinfo);
                this.team.invoice.invoicename = userinfo.firstname + ' ' + userinfo.lastname;
                return userinfo.firstname + ' ' + userinfo.lastname;

            },
            set(newValue) {
                this.team.invoice.invoicename = newValue;
            }

        },
        //STEP 1 VALIDATION 
        validation_type() {
            return this.team.type !== null;
        },
        validation_teammembername() {
            if (this.team.teammembername.length === 6) {

                this.team.teammembername = this.team.teammembername + '-'
            }

            return this.team.teammembername.length === 10;
            //return this.team.teammembername.length === 10;
        },
        validation_teammemberemail() {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(this.team.teammemberemail).toLowerCase());
        },
        validation_companyname() {
            return this.team.company !== '';
        },
        validation_name() {
            return this.team.name !== '' && this.team.uniquename;
        },
        validation_query() {
            return this.team.query !== '';
        },
        //STEP 2 VALIDATION
        validate_sponsname() {
            return this.team.giveaway.sponsname !== '';
        },
        validate_sponsaddress() {
            return this.team.giveaway.sponsaddress !== '';
        },
        validate_sponszipcode() {
            return this.team.giveaway.sponszipcode !== '';
        },
        validate_sponscity() {
            return this.team.giveaway.sponscity !== '';
        },
        //STEP 3 VALIDATION
        validate_voucher() {
            return this.team.voucher !== '' && this.team.validatevoucher;
        },
        validate_invoicename() {
            return this.team.invoice.invoicename !== '';
        },
        validate_invoiceorgno() {
            return this.team.invoice.invoiceorgno !== '';
        },
        validate_invoiceaddress() {
            return this.team.invoice.invoiceaddress !== '';
        },
        validate_invoicezip() {
            return this.team.invoice.invoicezip !== '';
        },
        validate_invoicecity() {
            return this.team.invoice.invoicecity !== '';
        },
        validate_marketingpackage() {
            return this.team.invoice.marketingpackage !== '';
        },

    },
    created() {

    },
    mixins: [tagsMixin],
    methods: {

        sizeOptions() {
            if (this.team.shirtPicker.gender === 'male') {
                return this.team.giveaway.maleoptions
            } else {
                return this.team.giveaway.femaleoptions

            }
        },
        formatZip(value, event) {

            if (isNaN(event.data)) {

                //var reg = new RegExp(event.data, "g");
                let valuex = value.replace(/a/gi, '');

                return valuex;
            } else if (value.length === 3) {

                return value + ' '
            } else {
                return value;
            }

        },
        checkTeamNameUnique(name) {
            let url = 'https://matchplay.meteorapp.com/methods/checkTeamNameUnique'
            this.axios.post(url, {
                    "competition": "sFAc3dvrn2P9pXHAz",
                    "teamnamecompany": name
                })
                .then(response => {
                    if (response.data.status === 'error') {
                        return;
                    } else if (response.data.status === 'ok') {
                        this.showloginspinner = false;
                        this.team.uniquename = true;

                    } else {
                        this.team.uniquename = false;
                    }

                })
                .catch(error => {
                    console.log(error);
                });
        },
        myChange(evt) {
            const size = evt.target.value
            if (this.team.giveaway.shirtstate === 1) {

                if (this.team.shirtPicker.player1.gender != this.team.shirtPicker.gender) {
                    this.team.shirtPicker.player1.gender = this.team.shirtPicker.gender;
                    this.team.shirtPicker.player1.shirt = false;

                }
                this.team.shirtPicker.player1.size = size;

            } else if (this.team.giveaway.shirtstate === 2) {
                if (this.team.shirtPicker.player2.gender != this.team.shirtPicker.gender) {
                    this.team.shirtPicker.player2.gender = this.team.shirtPicker.gender;
                    this.team.shirtPicker.player2.shirt = false;

                }
                this.team.shirtPicker.player2.size = size;

            }
        },
        shirtState(action) {
            this.team.giveaway.shirtstate = action; //set which player(x) should be updated

            this.clearShirts();
            this['isSelected' + this.team.giveaway['shirt' + action]] = true;

            if (action === 1) {
                this.team.giveaway.player1 = 'success';
                this.team.giveaway.player2 = 'light';
                this.team.giveaway.player1header = 'Välj piké till dig själv';
                this.team.giveaway.player2header = 'Klicka här för att välja till din lagkamrat';
                this.team.giveaway.selected = null;

            }

            if (action === 2) {
                this.team.giveaway.player2 = 'success'
                this.team.giveaway.player1 = 'light'
                this.team.giveaway.player1header = 'Klicka här för att välja till dig själv';
                this.team.giveaway.player2header = 'Välj piké till din lagkamrat';
                this.team.giveaway.selected = null;
            }
        },
        setGender(gender) {
            this.team.shirtPicker.gender = gender;
            if (gender === 'male') {
                this.team.giveaway.sizeoptions = this.team.giveaway.sizeoptions;

            } else {
                this.team.giveaway.sizeoptions = this.team.giveaway.femaleoptions;

            }
            clearShirts();
        },
        clearShirts() {

            var i;
            for (i = 0; i < 15; i++) {
                this["isSelected" + i] = false;
            }
            this.team.giveaway.selected = null;

        },
        getShirtImg(shirt) {
            return 'https://res.cloudinary.com/dn3hzwewp/image/upload/h_30,c_scale,q_50/v1575307928/matchplay/ping/' + shirt + '.png'
        },

        selectShirt(shirt) {
            this.clearShirts();
            this.team.shirtPicker.selected = shirt;
            if (this.team.giveaway.shirtstate === 1) {

                if (this.team.shirtPicker.player1.gender != this.team.shirtPicker.gender) {
                    this.team.shirtPicker.player1.gender = this.team.shirtPicker.gender;
                    this.team.shirtPicker.player1.size = '';
                }
                this.team.shirtPicker.player1.shirt = shirt;
            } else if (this.team.giveaway.shirtstate === 2) {
                if (this.team.shirtPicker.player2.gender != this.team.shirtPicker.gender) {
                    this.team.shirtPicker.player2.gender = this.team.shirtPicker.gender;
                    this.team.shirtPicker.player2.size = '';
                }
                this.team.shirtPicker.player2.shirt = shirt;
            }
        },
        prev() {

            this.team.step--;
            window.scrollTo(0, 0);

            //this.query.options.inputClass = 'is-valid'

        },
        next() {

            let element = '';
            let parentVue = this;

            //Validate step 1 fields
            if (this.team.step === 1) {

                element = document.querySelector("#type");
                if (element.classList.contains("is-invalid")) {
                    return;
                }

                if (this.team.type === 'Company') {
                    element = document.querySelector("#name");
                    if (element.classList.contains("is-invalid")) {
                        return;
                    }
                }

                element = document.querySelector("#teammembername");
                if (element.classList.contains("is-invalid")) {
                    return;
                }

                element = document.querySelector("#teammemberemail");
                if (element) {
                    if (element.classList.contains("is-invalid")) {
                        return;
                    }
                }

                //COURSE
                var x = document.getElementsByClassName("course");
                var i;
                for (i = 0; i < x.length; i++) {
                    if (x[i].classList.contains("is-invalid")) return;
                    if (x[i].value === '') return;
                }

                //SAVE TEAM BEHIND THE SCENES IF team._id is empty

                this.showloginspinner = true;

                let userinfo = localStorage.getItem('userinfo');
                userinfo = JSON.parse(userinfo);

                let url = '';
                let action = '';

                if (this.team._id === '') { //addteam
                    url = 'https://matchplay.meteorapp.com/methods/addTeam';
                    action = 'add'
                } else {
                    url = 'https://matchplay.meteorapp.com/methods/updateTeam'
                    action = 'update'
                }

                this.axios.post(url, {
                        "competition": "sFAc3dvrn2P9pXHAz",
                        "course": this.team.clubid,
                        "_id": this.team._id,
                        "type": this.team.type,
                        "paid": false,
                        "teamleader": userinfo._id,
                        "teamreserveemail": this.team.teamreserveemail,
                        "teammembergolfid": this.team.teammembergolfid,
                        "teammemberemail": this.team.teammemberemail,
                        "teamreservegolfid": this.team.teamreservegolfid,
                        "company": this.team.company,
                        "teamnamecompany": this.team.name,
                        "uistep": this.team.step
                    })
                    .then(response => {
                        if (response.data.status === 'error') {
                            return;
                        }

                        if (response.data.status === 'ok') {
                            //console.log('Team saved', response.data);
                            if (action === 'add') {
                                parentVue.team._id = response.data._id;
                            }
                            this.showloginspinner = false;
                            this.team.step++;
                            window.scrollTo(0, 0);
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });

            }

            //VALIDATE STEP 2
            if (this.team.step === 2) {
                this.team.giveaway.shirtwarning = false;
                //DEBUG 1: shirt 1 count = {{selectedShirt1}} | shirt = {{team.giveaway.shirt1}}<br>
                //DEBUG 2: shirt 2 count = {{selectedShirt2}} | shirt = {{team.giveaway.shirt2}}<br>

                if (this.team.shirtPicker.player1.shirt === '' || this.team.shirtPicker.player2.shirt === '' || !this.team.shirtPicker.player1.size || !this.team.shirtPicker.player2.size) {
                    this.team.giveaway.shirtwarning = true;
                    return;
                }

                element = document.querySelector("#sponsname");
                if (element.classList.contains("is-invalid")) {
                    return;
                }

                element = document.querySelector("#sponsaddress");
                if (element.classList.contains("is-invalid")) {
                    return;
                }

                element = document.querySelector("#sponszipcode");
                if (element.classList.contains("is-invalid")) {
                    return;
                }

                element = document.querySelector("#sponscity");
                if (element.classList.contains("is-invalid")) {
                    return;
                }

                //SAVE TEAM BEHIND THE SCENES

                this.showloginspinner = true;

                let userinfo = localStorage.getItem('userinfo');
                userinfo = JSON.parse(userinfo);

                let url = '';
                let action = '';

                url = 'https://matchplay.meteorapp.com/methods/updateTeam'
                action = 'update'

                this.axios.post(url, {
                        "competition": "sFAc3dvrn2P9pXHAz",
                        "_id": this.team._id,
                        "sponsormerch": true,
                        "item01": this.team.shirtPicker.player1.shirt,
                        "item02": this.team.shirtPicker.player2.shirt,
                        "property01": this.team.shirtPicker.player1.size,
                        "property02": this.team.shirtPicker.player2.size,
                        "sponsname": this.team.giveaway.sponsname,
                        "sponsaddress": this.team.giveaway.sponsaddress,
                        "sponszipcode": this.team.giveaway.sponszipcode,
                        "sponscity": this.team.giveaway.sponscity,
                        "uistep": this.team.step
                    })
                    .then(response => {

                        if (response.data.status === 'error') {
                            console.log("error");
                            return;
                        }

                        if (response.data.status === 'ok') {
                            this.showloginspinner = false;
                            this.team.step++;
                            window.scrollTo(0, 0);
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });

            }

        },
        getSwishStatus: function (team) {
            this.axios.post('https://matchplay.meteorapp.com/methods/getSwishStatus', {
                    "id": team,
                })
                .then(response => {
                    if (response.data.hasOwnProperty('status')) {
                        if (response.data.status === true) {
                            setTimeout(() => {
                                this.getSwishStatus(team);
                            }, 1000);
                        } else {
                            this.paymentstatus = response.data.paymentstatus;
                            this.showspinner_swish = false;
                            this.team.step = 4;

                        }
                    } else {
                        setTimeout(() => {
                            this.getSwishStatus(team);
                        }, 1000);
                    }

                })
                .catch(error => {
                    console.log(error);
                });
        },
        payVoucher: function () {
            this.showspinner_voucher = true;
            let voucher = this.team.voucher;
            this.axios.post('https://matchplay.meteorapp.com/methods/payVoucher', {
                    "competition": "sFAc3dvrn2P9pXHAz",
                    "team": this.team._id,
                    "code": voucher
                })
                .then(response => {
                    if (response.data.status === 'error') {
                        console.log("error");
                        return;
                    } else if (response.data.status === 'ok') {
                        this.showspinner_voucher = false;

                        if (response.data.paymentstatus === "PAID") {
                            this.paymentstatus = response.data.paymentstatus;
                            this.team.validatevoucher = true;
                            this.team.step = 4;

                        } else {
                            this.team.validatevoucher = false;
                        }

                    }

                })
                .catch(error => {
                    console.log(error);
                });
        },
        payInvoice: function () {
            this.showspinner_invoice = true;
            this.axios.post('https://matchplay.meteorapp.com/methods/payInvoice', {
                    //this.axios.post('http://localhost:3000/methods/payInvoice', {
                    "competition": "sFAc3dvrn2P9pXHAz",
                    //"competition": "YmweRj2PeatWfHEdM",
                    "team": this.team._id,
                    //"team": 'ns3ezQPncvt53cTmS',
                    "invoice": true,
                    "invoicename": this.team.invoice.invoicename,
                    "invoiceorgno": this.team.invoice.invoiceorgno,
                    "invoiceaddress": this.team.invoice.invoiceaddress,
                    "invoicezip": this.team.invoice.invoicezip,
                    "invoicecity": this.team.invoice.invoicecity,
                    "marketingpackage": this.team.invoice.marketingpackage
                })
                .then(response => {
                    if (response.data.status === 'error') {
                        console.log("error");
                        return;
                    } else if (response.data.status === 'ok') {
                        this.showspinner_voucher = false;

                        if (response.data.paymentstatus === "INVOICE") {
                            this.paymentstatus = response.data.paymentstatus;
                            this.team.validatevoucher = true;
                            this.team.step = 4;

                        } else {
                            this.team.validatevoucher = false;
                        }

                    }

                })
                .catch(error => {
                    console.log(error);
                });
        },
        swish: function () {
            this.showspinner_swish = true;
            let mobile = this.team.swish.mobile;
            mobile = mobile.replace(/\s/g, "");
            mobile = mobile.slice(1)
            let amount;
            if (this.team.type === "Private") {
                amount = this.team.price_private;
            }

            if (this.team.type === "Company") {
                amount = this.team.price_company;
            }

            this.axios.post('https://matchplay.meteorapp.com/methods/swish', {
                    "competition": "sFAc3dvrn2P9pXHAz",
                    "team": this.team._id,
                    "amount": amount,
                    "payer": mobile
                })
                .then(response => {
                    setTimeout(() => {
                        this.getSwishStatus(this.team._id);
                    }, 1000);
                })
                .catch(error => {
                    console.log(error);
                    this.showloginspinner = false;

                });
        },

        uploadCloudinary: function () {

            let parentVue = this;

            var CLOUDINARY_URL = '';
            var CLOUDINARY_UPLOAD_PRESET = '';
            var base_url = '';

            CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dn3hzwewp/image/upload';
            CLOUDINARY_UPLOAD_PRESET = 'vnozhel7';
            base_url = 'https://res.cloudinary.com/dn3hzwewp/image/upload/c_thumb,w_200/';

            var formData = new FormData();
            formData.append('file', this.team.file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            fetch(CLOUDINARY_URL, {
                    method: 'POST',
                    body: formData
                })
                .then(function (response) {

                    return response.json();
                })
                .then(function (data) {
                    //if (data.secure_url !== '') {
                    if (data.public_id !== '') {
                        var uploadedFileUrl = data.secure_url;
                        parentVue.team.logo = uploadedFileUrl;
                    }
                })

        },
        getGolfClubs: function () {
            this.axios
                .post(
                    "https://matchplay.meteorapp.com/methods/getGolfclubs"
                )
                .then(response => {
                    this.clubs = response.data;

                })
                .catch(error => {
                    //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";   
                    console.log(error);
                });
        },
        onCountryInputChange(query) {

            if (query.trim().length === 0) {
                var x = document.getElementsByClassName("course");
                var i;
                for (i = 0; i < x.length; i++) {
                    x[i].classList.add("is-invalid");
                    x[i].classList.remove("is-valid");
                }
                return null;
            }
            // return the matching countries as an array
            return this.clubs.filter((club) => {
                return club.title.toLowerCase().includes(query.toLowerCase())
            })
        },
        onSearchItemSelected(item) {

            this.selectedSearchItem = item.title;
            this.query = item.title;
            this.team.clubid = item._id;
            this.team.course = item.title;

            var x = document.getElementsByClassName("course");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].classList.add("is-valid");
                x[i].classList.remove("is-invalid");
            }

        },

        register: function () {
            this.$router.push({
                path: "/"
            });
            var element = this.$refs["register"];
            var top = element.offsetTop;
            window.scrollTo(0, top);
        },
        makeToast(message, variant) {
            this.$bvToast.toast(message, {
                title: 'Meddelande',
                autoHideDelay: 5000,
                appendToast: true,
                variant: variant
            })
        },
        edit_team(eventObj) {

            this.team.teamleader = eventObj.teamleader;

            if (this.team.teamleader) {
                this.team.is_readonly = false;
                this.create_team('edit', eventObj);
            } else {
                this.makeToast('Du är inte vald lagkapten till detta laget. Endast lagkaptenen kan redigera laget.', 'danger');
                this.team.is_readonly = true;
                this.create_team();
            }

        },
        create_team(action, eventObj) {

            this.showcreateteamhelper = false;
            window.scrollTo(0, 0);

            //load clubs to const
            this.getGolfClubs();
            //end

            if (action === 'new') {
                let userinfo = localStorage.getItem('userinfo');
                userinfo = JSON.parse(userinfo);
                this.team.is_readonly = false;
                //this.team = {};
                //this.team.type = 'Private' //remove later
                this.team.teamleadername = userinfo.golfid;
                //this.team.teammembername = '780110-010' //remove later
                //this.team.teamreservename = '780110-001' //remove later
                this.team.step = 1;
            }

            if (action === 'edit') {
                let userinfo = localStorage.getItem('userinfo');
                userinfo = JSON.parse(userinfo);
                this.team.is_readonly = false;
                this.team.type = eventObj.type;
                this.team_id = eventObj._id;
                this.team.step = eventObj.uistep;
                this.team.teamleadername = eventObj.teamleadername;

                //this.team = {};
                //this.team.type = 'Private' //remove later

            }

            this.showteamslist = false;
            this.showcreateteam = true;
        },
        cancel_team() {
            this.showcreateteam = false;
            this.showteamslist = true;
            this.team.step = 0;
            window.scrollTo(0, 0);
        },
        save_state1(evt) {

            let userinfo = localStorage.getItem('userinfo');
            userinfo = JSON.parse(userinfo);

            this.axios.post('https://matchplay.meteorapp.com/methods/addTeam', {
                    "competition": "sFAc3dvrn2P9pXHAz",
                    "course": this.team.clubid,
                    "type": this.team.type,
                    "paid": false,
                    "teamleader": userinfo._id,
                    "teamreserveemail": this.team.teamreserveemail,
                    "teammembergolfid": this.team.teammembergolfid,
                    "teammemberemail": this.team.teammemberemail,
                    "teamreservegolfid": this.team.teamreservegolfid
                })
                .then(response => {

                    if (response.data.status === 'error') {
                        console.log("error")
                        return;
                    }

                    if (response.data.status === 'ok') {
                        this.team.state = 2;
                    }

                })
                .catch(error => {
                    console.log(error);
                });

            window.scrollTo(0, 0);

        },
        save_state2(evt) {
            this.team.state = 3;
        },
        save_team(evt) {
            //alert(JSON.stringify(this.team));

            let userinfo = localStorage.getItem('userinfo');
            userinfo = JSON.parse(userinfo);

            this.axios.post('https://matchplay.meteorapp.com/methods/addTeam', {
                    "competition": "sFAc3dvrn2P9pXHAz",
                    "course": this.team.clubid,
                    "type": this.team.type,
                    "paid": false,
                    "teamleader": userinfo._id,
                    "teamreserveemail": this.team.teamreserveemail,
                    "teammembergolfid": this.team.teammembergolfid,
                    "teammemberemail": this.team.teammemberemail,
                    "teamreservegolfid": this.team.teamreservegolfid
                })
                .then(response => {

                    if (response.data.hasOwnProperty('error')) {
                        console.log("error")
                        return;
                    }

                    return;
                })
                .catch(error => {
                    console.log(error);
                });

            window.scrollTo(0, 0);

        },
        login(evt) {
            evt.preventDefault();
            this.showloginspinner = true;

            //DDP LOGIN
            //const simpleDDP = require("simpleddp");
            //const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;

            const server = new simpleDDP(opts, [simpleDDPLogin]);

            let password = this.form.pwd;
            let email = this.form.email;
            let parentVue = this;

            // doAsyncOperation1() returns a promise.
            trylogin()
                .then(() => {
                    //console.log('logged in with creds', server.token);
                    parentVue.showerror = false;
                    localStorage.setItem('auth_token', server.token);
                    parentVue.showlogin = false;
                    parentVue.showloginspinner = false;
                    parentVue.doctitle = 'My Matchplay';
                    //Set params for user
                    this.axios.post('https://matchplay.meteorapp.com/methods/getPlayerData', {
                            "id": server.userId
                        })
                        .then(response => {
                            if (response.data.hasOwnProperty('error')) {
                                console.log("error")
                                return;
                            }

                            let userinfo = response.data;
                            localStorage.setItem('userinfo', JSON.stringify(userinfo));
                            parentVue.setuserinfoform();

                            return;
                        })
                        .catch(error => {
                            console.log(error);
                        });

                })
                .then((output) => {

                })
                .catch((err) => {
                    console.log(err)
                    console.log('NOT logged in with creds, show error on form');

                    parentVue.showerror = true;
                    parentVue.showloginspinner = false;
                });

            async function trylogin() { // (1)
                let response = await server.login({
                    password,
                    user: {
                        email
                    }
                });
            }

        },
        isloggedin: function () {

            server.on('login', (m) => {});

        },
        checkGolfID: function (golfid, target) {

            let userinfo = localStorage.getItem('userinfo');
            userinfo = JSON.parse(userinfo);

            if (golfid === '') return;
            if (!golfid.includes("-")) return;
            if (!golfid.length === 10) return;

            if (target === '2') {
                this.showspinner_2 = true;

                //Check if own golf id search, not accepted
                if (userinfo.golfid === golfid) {
                    this.team.checkgolfidvariant2 = "warning";
                    this.team.player_2_name = 'Du kan inte söka på ditt eget golf id.';
                    this.team.player_2_hcp = '';
                    this.team.player_2_exists = true;
                    this.team.showplayer2 = true;
                    this.showspinner_2 = false;
                    return;
                }
            }

            if (target === '3') {
                this.showspinner_3 = true;

                //Check if own golf id search, not accepted
                if (userinfo.golfid === golfid) {
                    this.team.checkgolfidvariant3 = "warning";
                    this.team.player_3_name = 'Du kan inte söka på ditt eget golf id.'
                    this.team.showplayer3 = true;
                    this.showspinner_3 = false;
                    return;
                }

            }

            this.axios
                .post(
                    "https://matchplay.meteorapp.com/methods/getPlayerByGolfid",
                    //"https://colburn-chat-buxom-tamale.eu-gb.mybluemix.net/get_golfid?golfid=" + golfid,
                    //"http://localhost:3000/get_golfid?golfid=" + golfid1 + '-' + golfid2,
                    {
                        golfid: golfid
                    }
                )
                .then(response => {

                    if (response.data.hasOwnProperty('notingit')) {}

                    if (!response.data.hasOwnProperty('notingit')) {

                        if (target === '2') {
                            this.team.checkgolfidvariant2 = "primary";
                            this.team.showplayer2 = true;
                            this.team.player_2_name = response.data.firstname + ' ' + response.data.lastname;
                            this.team.player_2_hcp = response.data.hcp.replace(/,/g, '.');
                            this.team.teammembergolfid = golfid;
                            this.team.player_2_exists = response.data.exists;

                            this.team.showplayer2 = true;
                            this.showspinner_2 = false;
                            this.team.showplayer2 = true;
                        }

                        if (target === '3') {
                            this.team.checkgolfidvariant3 = "primary";
                            this.team.showplayer3 = true;
                            this.team.player_3_name = response.data.firstname + ' ' + response.data.lastname;
                            this.team.player_3_hcp = response.data.hcp.replace(/,/g, '.');
                            this.team.teamreservegolfid = golfid;
                            this.team.player_3_exists = response.data.exists;

                            this.team.showplayer3 = true;
                            this.showspinner_3 = false;
                            this.team.showplayer3 = true;
                        }

                        //this.form.hcp = response.data.hcp.replace(/,/g, '.')

                        //if (response.data.club == 'empty') {
                        //  this.showqualifiedNOCLUB = true;
                        //  return;
                        //}

                        /*
          if (this.form.hcp < 32) {
              this.showqualified = true;
          } else if (this.form.hcp > 32 && this.form.hcp < 36.1 ) {
              this.showqualified32 = true;
          } else if (this.form.hcp > 36.0) {
               this.showqualifiedNOT = true;
          }
          */

                        return;
                    } else {

                        if (target === '2') {
                            this.team.checkgolfidvariant2 = "danger";
                            this.team.player_2_name = 'Hittade inte spelaren';
                            this.team.player_2_hcp = '';
                            this.team.player_2_exists = true;
                            this.showspinner_2 = false;
                            this.team.showplayer2 = true;
                        }

                        if (target === '3') {
                            this.team.checkgolfidvariant3 = "danger";
                            this.team.player_3_name = 'Hittade inte spelaren';
                            this.team.player_3_hcp = '';
                            this.team.player_3_exists = true;
                            this.showspinner_3 = false;
                            this.team.showplayer3 = true;
                        }

                        //this.showAlert();
                        //this.showloadgolfid = false;
                        return;
                    }

                })
                .catch(error => {
                    //this.player_1_error = "Golfaren hittades inte... prova att skriva in golfid igen.";   
                    console.log(error);
                });
        },
        logoutPrompt: function () {
            this.boxTwo = ''
            this.$bvModal.msgBoxConfirm('Vill du verkligen logga ut från Matchplay?', {
                    title: 'Logga ut?',
                    size: 'md',
                    buttonSize: 'md',
                    okVariant: 'danger',
                    okTitle: 'Japp, jag är säker',
                    cancelTitle: 'Nej tack',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    if (value) {
                        this.logout();
                    }
                })
                .catch(err => {
                    // An error occurred
                })
        },

        logout: function () {

            //const simpleDDP = require("simpleddp");
            //const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;

            const server = new simpleDDP(opts, [simpleDDPLogin]);
            let parentVue = this;

            localStorage.setItem('auth_token', '');
            localStorage.setItem('userinfo', '');

            async function trylogout() { // (1)
                let response = await server.logout(); // (2)
                parentVue.doctitle = 'Logga in';
                parentVue.showlogin = true;
                parentVue.showloginspinner = false;
                parentVue.loading = false;

                parentVue.makeToast('Du är nu utloggad.', 'primary');
                this.$username = 'Logga in';

                window.scrollTo(0, 0);

            }

            trylogout();

            server.on('logout', () => {
                console.log('User logged out');
            });

        },
        setuserinfoform: function () {

            let userinfo = localStorage.getItem('userinfo');
            if (userinfo) {
                try {
                    //SET KEYS in form        
                    userinfo = JSON.parse(userinfo);
                    this.userdetails.firstname = userinfo.firstname;
                    this.userdetails.lastname = userinfo.lastname;

                    this.$username = this.userdetails.firstname;

                    //check if user has teams or not
                    if (userinfo.teams) {
                        this.showteamslist = true;
                        this.showcreateteamhelper = false;
                        this.teams = userinfo.teams.filter((team) => {
                            return team.paid || team.invoice
                        });
                    } else {
                        this.teams = {};
                        this.showcreateteamhelper = true;
                        this.showteamslist = false;
                    }
                    //end check teams

                    this.loading = false;

                } catch (e) {
                    console.log('error')
                    //something went wrong, maybe the token is too old or not valid
                }
            } else {
                this.showlogin = true;
            }

            //console.log(Object.keys(jsonObj));  // returns ["person", "age"]
            //this.userdetails.firstName = myJsonString.firstName;
        }
    },

    updated: function () {},

    mounted: function () {

        const server = new simpleDDP(opts, [simpleDDPLogin]);
        let parentVue = this;

        let auth_token = localStorage.getItem('auth_token');

        if (auth_token) {
            trylogin()
                .then(() => {
                    //console.log('logged in with token in local storage',server.token);      
                    parentVue.doctitle = 'My Matchplay';

                    this.axios.post('https://matchplay.meteorapp.com/methods/getPlayerData', {
                            "id": server.userId
                        })
                        .then(response => {
                            // console.log('mounted',response.data)

                            if (response.data.hasOwnProperty('error')) {
                                console.log("error")
                                return;
                            }

                            let userinfo = response.data;
                            localStorage.setItem('userinfo', JSON.stringify(userinfo));
                            parentVue.setuserinfoform();

                            return;
                        })
                        .catch(error => {
                            console.log(error);
                        });

                })
                .then((output) => {

                })
                .catch((err) => {
                    this.showlogin = true;
                });
        } else {
            this.showlogin = true;
            this.loading = false;
        }

        // doAsyncOperation1() returns a promise.

        async function trylogin() { // (1)
            let response = await server.login({
                resume: auth_token
            }); // (2)  
        }

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
@import "../styles/variables.scss";

.btn i {
    vertical-align: sub;
}

.file-input~.file-label::after {
    content: 'Välj fil';
}

.help {
    margin-left: 0.5em;
    vertical-align: text-bottom;
}

.team h4 {
    font-size: 1.2em;
    min-height: 50px;
}

.team {
    cursor: pointer;
    font-size: 0.9em;
}

.team i {
    vertical-align: bottom;
}

.sessions-container.my-schedule .row.session {
    display: none !important;
}

.sessions-container.my-schedule .row.session {
    opacity: 0.3;
}

.sessions-container.my-schedule .row.session.active {
    display: flex !important;
    opacity: 1;
}

.no-my-schedule {
    margin: 10rem 0;
}

i.big {
    z-index: -1;
    position: absolute;
    font-size: 22rem;
    opacity: 0.2;
    line-height: 7rem;
    margin-left: -11rem;
}

.shirt {
    cursor: pointer;
}

.selected {
    background: #FFFFCC;

}

#male-button,
#female-button {
    background-color: $light;
}

#male-button.btn-male {
    background-color: $success;
    color: #fff;
}

#female-button.btn-female {
    background-color: $success;
    color: #fff;

}

img.overview-logo {
    float: right;
    max-height: 30px;
}

.pulse-button {

    position: relative;
    /*width: 100px;
  height: 100px;*/
    border: none;
    box-shadow: 0 0 0 0 rgba(105, 179, 254, 1);
    background-color: #69b3fe !important;
    background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/173024/jonathanlarradet_copy.png);
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
    -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
    -moz-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
    -ms-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
    animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
}

.pulse-button:hover {
    -webkit-animation: none;
    -moz-animation: none;
    -ms-animation: none;
    animation: none;
}

@-webkit-keyframes pulse {
    to {
        box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);
    }
}

@-moz-keyframes pulse {
    to {
        box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);
    }
}

@-ms-keyframes pulse {
    to {
        box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);
    }
}

@keyframes pulse {
    to {
        box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);
    }
}
</style>
