const MembershipPlan = require('../model/plan');
const HttpError = require('../model/http-error');




// Create membership plan
const createPlan = async (req, res) => {
    try {
      const membershipPlan = new MembershipPlan(req.body);
      await membershipPlan.save();
      res.status(201).json(membershipPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all membership plans
  const getAll = async (req, res) => {
    try {
      const membershipPlans = await MembershipPlan.find().populate('subscribers');
      res.json(membershipPlans);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get membership plan by ID
  const getById = async (req, res) => {
    try {
      const id = req.params.id;
      const membershipPlan = await MembershipPlan.findById(id).populate('subscribers');
      if (!membershipPlan) {
        return res.status(404).json({ message: 'Membership plan not found' });
      }
      res.json(membershipPlan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get membership plan by Name
  const getByName = async (req, res) => {
    try {
      const name = req.params.name;
      const membershipPlan = await MembershipPlan.findOne({ planName: name }).populate('subscribers');
      if (!membershipPlan) {
        return res.status(404).json({ message: 'Membership plan not found' });
      }
      res.json(membershipPlan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update membership plan
  const updatePlan = async (req, res) => {
    try {
      const id = req.params.id;
      const membershipPlan = await MembershipPlan.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!membershipPlan) {
        return res.status(404).json({ message: 'Membership plan not found' });
      }
      res.json(membershipPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Update membership plan by Name
  const updateByName = async (req, res) => {
    try {
      const name = req.params.name;
      const membershipPlan = await MembershipPlan.findOneAndUpdate({ planName: name }, req.body, {
        new: true,
      });
      if (!membershipPlan) {
        return res.status(404).json({ message: 'Membership plan not found' });
      }
      res.json(membershipPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete membership plan
  const deletePlan = async (req, res) => {
    try {
      const id = req.params.id;
      await MembershipPlan.findByIdAndRemove(id);
      res.status(204).json({ message: 'Membership plan deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete membership plan by Name
  const deleteByName = async (req, res) => {
    try {
      const name = req.params.name;
      await MembershipPlan.findOneAndRemove({ planName: name });
      res.status(204).json({ message: 'Membership plan deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


  exports.createPlan = createPlan;
  exports.getAll = getAll;
  exports.getById = getById;
  exports.getByName = getByName
  exports.updatePlan = updatePlan;
  exports.updateByName = updateByName;
  exports.deletePlan = deletePlan;
  exports.deleteByName = deleteByName;