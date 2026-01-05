import { useState } from 'react';
import { User, Star, Plus, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Skill } from '../types';

export default function SkillsManagement() {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([
    { language: 'Python', proficiency: 'Expert', selected: true },
    { language: 'JavaScript', proficiency: 'Intermediate', selected: false },
    { language: 'TypeScript', proficiency: 'Advanced', selected: true },
    { language: 'Java', proficiency: 'Beginner', selected: false },
    { language: 'C', proficiency: 'Intermediate', selected: false },
    { language: 'C++', proficiency: 'Intermediate', selected: false },
  ]);

  const toggleSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills[index].selected = !newSkills[index].selected;
    setSkills(newSkills);
  };

  const updateProficiency = (index: number, proficiency: Skill['proficiency']) => {
    const newSkills = [...skills];
    newSkills[index].proficiency = proficiency;
    setSkills(newSkills);
  };

  const proficiencyLevels: Skill['proficiency'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Skills</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Manage your Skills
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Programming Languages
              </h4>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div
                    key={skill.language}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={skill.selected}
                      onChange={() => toggleSkill(index)}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{skill.language}</p>
                    </div>
                    <select
                      value={skill.proficiency}
                      onChange={(e) =>
                        updateProficiency(index, e.target.value as Skill['proficiency'])
                      }
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {proficiencyLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Others</h4>
              <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                <Plus className="w-5 h-5" />
                Add Skills
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-600">
                  Mentor since {user?.mentorSince || '2024'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Rating:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.floor(user?.rating || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm font-medium text-gray-900 ml-1">
                  {user?.rating || '0.0'}
                </span>
              </div>
            </div>
          </div>

          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
            <Save className="w-5 h-5" />
            Save Skills
          </button>
        </div>
      </div>
    </div>
  );
}
