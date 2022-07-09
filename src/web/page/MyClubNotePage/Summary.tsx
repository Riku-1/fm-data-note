import React from "react";
import {CurrentPlayer, getAge} from "../../../package/domain/model/player/CurrentPlayer";
import {HomeGrownStatus} from "../../../package/domain/model/player/HomeGrownStatus";

export type SummaryProps = {
    currentPlayers: CurrentPlayer[]
}

export const Summary = (props: SummaryProps) => {
    return (
        <div>
            <div>Team: { props.currentPlayers.filter(player => {
                return player.isMember
            }).length }</div>
            <div>ClubGrown(T): { props.currentPlayers.filter(player => {
                return !player.isPlanToRelease && player.homeGrownStatus === HomeGrownStatus.Club
            }).length }</div>

            <div>ClubGrown(M): { props.currentPlayers.filter(player => {
                return !player.isPlanToRelease && player.isMember && player.homeGrownStatus === HomeGrownStatus.Club
            }).length }</div>

            <div>NationGrown(T): { props.currentPlayers.filter(player => {
                return !player.isPlanToRelease && player.homeGrownStatus === HomeGrownStatus.Nation
            }).length }</div>

            <div>NationGrown(M): { props.currentPlayers.filter(player => {
                return !player.isPlanToRelease && player.isMember && player.homeGrownStatus === HomeGrownStatus.Nation
            }).length }</div>

            <div>U20: { props.currentPlayers.filter(player => {
                return !player.isPlanToRelease && getAge(player) < 20
            }).length }</div>
        </div>
    )

}