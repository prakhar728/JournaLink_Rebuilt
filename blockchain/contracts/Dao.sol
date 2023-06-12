// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Dao { 

     uint256 private TotalMembers;
     address[] private members;
     mapping(string=>proposal) proposals;
     address immutable owner;
     
     struct proposal{
         string requirement;
         uint256 maxMembers;
         mapping(address=>string[]) commits;
         uint256 reward;
         bool initialized;
     }

     constructor(){
         owner = msg.sender;
     }
    /**
     * @dev Number of Members
     * @return value of 'TotalMembers'
     */
    function getTotalMembers() view public returns(uint256) {
        return TotalMembers;
    }

     /**
     * @dev Get the commits of a particular Member
     * @param _memberAddr Address of the Member whose Commits have to be fetched
     * @param _proposalId Proposal ID of the proposal where commits need to be viewd
     * @return value of 'TotalMembers'
     */
    function getCommits(address _memberAddr,string calldata _proposalId) view public returns( string [] memory) {
       return proposals[_proposalId].commits[_memberAddr];
    }
    /**
     * @dev Get the commits of a particular Member
     * @return value of 'members'
     */
    function getAllMembers() view public returns(address[] memory ) {
       return members;
    }


    /**
     * @dev Add a member to the Dao
     * @param _newMember Address of the New Member
     */
    function addMember(address _newMember)  internal {
        members.push(_newMember);
    }

    /**
     * @dev Add a new Proposal to the Dao
     * @param _proposalId Id of the proposal Being created
     * @param _required The requirements of the proposal Being created
     */
    function  createProposal(string calldata _proposalId,string calldata _required, uint256 _maxMembers) public {
         require(!proposals[_proposalId].initialized, "Proposal already initialized for the given key");
         proposal storage t = proposals[_proposalId];
         t.requirement=_required;
         t.maxMembers = _maxMembers;
         t.initialized=true;
    }

     /**
     * @dev Add a new Proposal to the Dao
     * @param _proposalID Id of the proposal Being created
     * @param _commitData IPFS link of the data commited
     */
    function commitData(string calldata _proposalID,string calldata _commitData,uint256 _rewardAmount) public payable {
        require(_rewardAmount==msg.value,"You need to lock more tokens");
         proposal storage t = proposals[_proposalID];
         t.commits[msg.sender].push(_commitData);
         TotalMembers=TotalMembers+1;
         members.push(msg.sender);
    }

    /**
     * @dev Add a new Proposal to the Dao
     * @param _proposalID Id of the proposal Being created
     */
    function rewardMembers(string calldata _proposalID) public {
         proposal storage t = proposals[_proposalID];
         uint256 rewardPerPerson = t.reward/members.length;
         for(uint256 i=0;i<members.length;i++){
             payable(members[i]).transfer(rewardPerPerson);
         }
    }



  
}